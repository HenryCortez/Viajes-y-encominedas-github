import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Routes } from '@nestjs/core';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Route, RoutesDetail } from '@prisma/client';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { Role } from 'src/authorization/Infrastructure/decorators/authorization.decorator';
import { AuthorizationGuard } from 'src/authorization/Infrastructure/guards/authorization.guard';
import { CreateRouteDetailDto } from 'src/route/Application/dtos/create-route-detail.dto';
import { CreateRouteDto } from 'src/route/Application/dtos/create-route.dto';
import { CreateRouteDetailUsecase } from 'src/route/Application/usecases/create-route-detail.usecase';
import { CreateRouteUsecase } from 'src/route/Application/usecases/create-route.usecase';
import { GetRoutesByDestinationCityNameUsecase } from 'src/route/Application/usecases/get-routes-by-destination-city-name.usecase';
import { GetRoutesByOriginCityNameUsecase } from 'src/route/Application/usecases/get-routes-by-origin-city-name.usecase';

@ApiTags('Rutas')
@ApiBearerAuth()
@Controller('routes/')
@Role('admin', 'secretaria', 'conductor')
@UseGuards(AuthGuard, AuthorizationGuard)
export class RouteController {
  constructor(
    private readonly createRouteUsecase: CreateRouteUsecase,
    private readonly createRouteDetailUsecase: CreateRouteDetailUsecase,
    private readonly getRoutesByOriginCityNameUsecase: GetRoutesByOriginCityNameUsecase,
    private readonly getRoutesByDestinationCityNameUsecase: GetRoutesByDestinationCityNameUsecase,
  ) {}

  @Get('origin/:originCityName')
  @ApiOperation({
    summary: 'Listar Rutas por Ciudad de Origen',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async getRoutesByOriginCityName(
    @Res() res,
    @Param('originCityName') city: string,
  ): Promise<Routes[]> {
    const routes = await this.getRoutesByOriginCityNameUsecase.execute(city);

    return res.status(HttpStatus.OK).json(routes);
  }

  @Get('destination/:destinationCityName')
  @ApiOperation({
    summary: 'Listar Rutas por Ciudad de Destino',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async getRoutesByDestinationCityName(
    @Res() res,
    @Param('destinationCityName') city: string,
  ): Promise<Routes[]> {
    const routes =
      await this.getRoutesByDestinationCityNameUsecase.execute(city);

    return res.status(HttpStatus.OK).json(routes);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Crear Ruta',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async createRoute(@Res() res, @Body() route: CreateRouteDto): Promise<Route> {
    const createdRoute = await this.createRouteUsecase.execute(route);

    return res.status(HttpStatus.CREATED).json(createdRoute);
  }

  @Post('/create/detail')
  @ApiOperation({
    summary: 'Crear Detalle de Ruta',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async createRouteDetail(
    @Res() res,
    @Body() route: CreateRouteDetailDto,
  ): Promise<RoutesDetail> {
    const createdRouteDetail =
      await this.createRouteDetailUsecase.execute(route);

    return res.status(HttpStatus.CREATED).json(createdRouteDetail);
  }
}
