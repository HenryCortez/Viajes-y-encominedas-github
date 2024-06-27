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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { Role } from 'src/authorization/Infrastructure/decorators/authorization.decorator';
import { AuthorizationGuard } from 'src/authorization/Infrastructure/guards/authorization.guard';
import { CreateDriverDto } from 'src/driver/Application/dtos/create-driver.dto';
import { CreateDriverUsecase } from 'src/driver/Application/usecases/create-driver.useacase';
import { DeleteDriverUsecase } from 'src/driver/Application/usecases/delete-driver.usecase';
import { ListDriversUsecase } from 'src/driver/Application/usecases/list-drivers.usecase';

@ApiTags('Conductores')
@ApiBearerAuth()
@Controller('drivers/')
@Role('admin', 'conductor')
@UseGuards(AuthGuard, AuthorizationGuard)
export class DriverController {
  constructor(
    private readonly createDriverUsercase: CreateDriverUsecase,
    private readonly deleteDriverUsercase: DeleteDriverUsecase,
    private readonly listDriversUsercase: ListDriversUsecase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Conductores',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async listDrivers(@Res() res) {
    const drivers = await this.listDriversUsercase.execute();

    return res.status(HttpStatus.OK).json(drivers);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Crear Conductor',
    description: 'Este endpoint es accesible por los roles: admin, conductor.',
  })
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
  @ApiOperation({
    summary: 'Eliminar Conductor',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async deleteDriver(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const deletedDriver = await this.deleteDriverUsercase.execute(id);

    return res.status(HttpStatus.OK).json(deletedDriver);
  }
}
