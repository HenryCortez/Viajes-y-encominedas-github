import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, Request } from '@prisma/client';
import { NewDriverEvent } from 'src/driver/Infrastructure/events/new.driver.event';
import { UpdateRequestDto } from 'src/request/Application/dtos/update-request.dto';
import { RequestRepositoryPort } from 'src/request/Domain/repositories/request.repository.port';
import { UpdateRequestEvent } from '../events/update.request.event';

@Injectable()
export class RequestRepositoryAdapter implements RequestRepositoryPort {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('driver.created')
  async createRequest(payload: NewDriverEvent): Promise<Request> {
    const newRequest = await this.prisma.request.findFirst({
      where: { userId: payload.userId },
    });

    if (newRequest === null) {
      const createdRequest = await this.prisma.request.create({
        data: {
          userId: payload.userId,
          requestDate: new Date(),
          dataFile: payload.dataFile,
        },
      });
      return createdRequest;
    }
    return;
  }

  async getRequestsByEnterpriseId(request: any): Promise<Request[]> {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('No authorization token');
    }

    const decodedToken = this.jwtService.decode(token);

    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    const email = decodedToken.email;

    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const enterPriseId = user.enterpriseId;

    const requests = await this.prisma.request.findMany({
      where: {
        user: {
          enterpriseId: enterPriseId,
        },
      },
      include: {
        user: true,
      },
    });

    return requests;
  }

  async updateRequest(
    requestId: number,
    request: UpdateRequestDto,
  ): Promise<Request> {
    const updatedRequest = await this.prisma.request.update({
      where: { id: requestId },
      data: {
        status: request.status,
      },
    });

    this.eventEmitter.emit(
      'request.updated',
      new UpdateRequestEvent(updatedRequest.userId, updatedRequest.status),
    );

    return updatedRequest;
  }
}
