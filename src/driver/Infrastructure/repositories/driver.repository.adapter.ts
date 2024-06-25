import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Driver, PrismaClient } from '@prisma/client';
import { DriverRepositoryPort } from '../../Domain/repositories/driver.repository.port';
import { NewDriverEvent } from '../events/new.driver.event';
import { UpdateRequestEvent } from '../../../request/Infrastructure/events/update.request.event';

@Injectable()
export class DriverRepositoryAdapter implements DriverRepositoryPort {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaClient,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
    });
  }

  async createDriver(
    fileName: string,
    file: Buffer,
    driver: Partial<Driver>,
  ): Promise<any> {
    const uploadResult = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file,
      }),
    );

    const objectUrl = `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;

    const createdDriver = await this.prisma.driver.create({
      data: {
        user_id: Number(driver.user_id),
        dataFile: objectUrl,
      },
    });

    this.eventEmitter.emit(
      'driver.created',
      new NewDriverEvent(createdDriver.user_id, createdDriver.dataFile),
    );

    return createdDriver;
  }

  async listDrivers(): Promise<Driver[]> {
    return await this.prisma.driver.findMany();
  }

  @OnEvent('request.updated')
  async updateDriver(payload: UpdateRequestEvent): Promise<Driver> {
    const driver = await this.prisma.driver.findUnique({
      where: { user_id: payload.userId },
    });

    const driverCurrentStatus = driver.status;

    if (payload.status === true && driverCurrentStatus === true) {
      return;
    }

    const updatedDriver = await this.prisma.driver.update({
      where: { user_id: payload.userId },
      data: { status: payload.status },
    });

    return updatedDriver;
  }

  async deleteDriver(id: number): Promise<boolean> {
    const driver = await this.prisma.driver.findUnique({ where: { id } });

    if (driver != undefined && driver.status) {
      const updatedDriver = await this.prisma.driver.update({
        where: { id },
        data: { status: false },
      });

      if (!updatedDriver.status) {
        return true;
      }
    }

    return false;
  }
}
