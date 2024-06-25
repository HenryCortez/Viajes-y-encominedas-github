import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Routes } from '@nestjs/core';
import { Route, RoutesDetail } from '@prisma/client';
import { CreateRouteDetailDto } from 'src/route/Application/dtos/create-route-detail.dto';
import { CreateRouteDto } from 'src/route/Application/dtos/create-route.dto';
import { CreateRouteDetailUsecase } from 'src/route/Application/usecases/create-route-detail.usecase';
import { CreateRouteUsecase } from 'src/route/Application/usecases/create-route.usecase';
import { GetRoutesByDestinationCityNameUsecase } from 'src/route/Application/usecases/get-routes-by-destination-city-name.usecase';
import { GetRoutesByOriginCityNameUsecase } from 'src/route/Application/usecases/get-routes-by-origin-city-name.usecase';

@Controller('routes/')
export class RouteController {
  constructor(
    private readonly createRouteUsecase: CreateRouteUsecase,
    private readonly createRouteDetailUsecase: CreateRouteDetailUsecase,
    private readonly getRoutesByOriginCityNameUsecase: GetRoutesByOriginCityNameUsecase,
    private readonly getRoutesByDestinationCityNameUsecase: GetRoutesByDestinationCityNameUsecase,
  ) {}

  @Get('origin/:originCityName')
  async getRoutesByOriginCityName(
    @Res() res,
    @Param('originCityName') city: string,
  ): Promise<Routes[]> {
    const routes = await this.getRoutesByOriginCityNameUsecase.execute(city);

    return res.status(HttpStatus.OK).json(routes);
  }

  @Get('destination/:destinationCityName')
  async getRoutesByDestinationCityName(
    @Res() res,
    @Param('destinationCityName') city: string,
  ): Promise<Routes[]> {
    const routes =
      await this.getRoutesByDestinationCityNameUsecase.execute(city);

    return res.status(HttpStatus.OK).json(routes);
  }

  @Post('/create')
  async createRoute(@Res() res, @Body() route: CreateRouteDto): Promise<Route> {
    const createdRoute = await this.createRouteUsecase.execute(route);

    return res.status(HttpStatus.CREATED).json(createdRoute);
  }

  @Post('/create/detail')
  async createRouteDetail(
    @Res() res,
    @Body() route: CreateRouteDetailDto,
  ): Promise<RoutesDetail> {
    const createdRouteDetail =
      await this.createRouteDetailUsecase.execute(route);

    return res.status(HttpStatus.CREATED).json(createdRouteDetail);
  }
}
