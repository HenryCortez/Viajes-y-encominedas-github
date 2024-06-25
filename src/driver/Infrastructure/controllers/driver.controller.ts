import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDriverDto } from 'src/driver/Application/dtos/create-driver.dto';
import { CreateDriverUsecase } from 'src/driver/Application/usecases/create-driver.useacase';
import { DeleteDriverUsecase } from 'src/driver/Application/usecases/delete-driver.usecase';
import { ListDriversUsecase } from 'src/driver/Application/usecases/list-drivers.usecase';
import { UpdateDriverUsecase } from 'src/driver/Application/usecases/update-driver.usecase';

@Controller('drivers/')
export class DriverController {
  constructor(
    private readonly createDriverUsercase: CreateDriverUsecase,
    private readonly deleteDriverUsercase: DeleteDriverUsecase,
    private readonly listDriversUsercase: ListDriversUsecase,
    private readonly updateDriverUsercase: UpdateDriverUsecase,
  ) {}

  @Get()
  async listDrivers(@Res() res) {
    const drivers = await this.listDriversUsercase.execute();

    return res.status(HttpStatus.OK).json(drivers);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async createDriver(
    @UploadedFile() file: Express.Multer.File,
    @Body() driver: CreateDriverDto,
  ) {
    return await this.createDriverUsercase.execute(
      file.originalname,
      file.buffer,
      {
        userId: driver.userId,
      },
    );
  }

  @Delete(':id')
  async deleteDriver(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const deletedDriver = await this.deleteDriverUsercase.execute(id);

    return res.status(HttpStatus.OK).json(deletedDriver);
  }
}
