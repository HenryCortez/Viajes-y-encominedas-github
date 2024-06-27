import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Res,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { AuthorizationGuard } from 'src/authorization/Infrastructure/guards/authorization.guard';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import {
  GetWalletByIdUsecase,
  GetWalletDetailUsecase,
  ListWalletDetailUsecase,
  ListWalletUsecase,
} from 'src/wallet/Application/usecases';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/authorization/Infrastructure/decorators/authorization.decorator';

@ApiTags('Billeteras')
@ApiBearerAuth()
@Controller('wallet/')
@Role('admin', 'conductor')
@UseGuards(AuthGuard, AuthorizationGuard)
export class WalletController {
  constructor(
    private listWalletUsecase: ListWalletUsecase,
    private listWalletDetailUsecase: ListWalletDetailUsecase,
    private getWalletByIdUsecase: GetWalletByIdUsecase,
    private getWalletDetailUsecase: GetWalletDetailUsecase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Billeteras',
    description: 'Este endpoint es accesible por los roles: admin, conductor.',
  })
  async listWallet(@Res() response): Promise<any> {
    const wallets = await this.listWalletUsecase.execute();
    return response.status(HttpStatus.OK).json(wallets);
  }

  @Get('details/:id')
  @ApiOperation({
    summary: 'Listar Detalles de Billetera',
    description: 'Este endpoint es accesible por los roles: admin, conductor.',
  })
  async listWalletDetail(
    @Res() response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const walletDetail = await this.listWalletDetailUsecase.execute(id);
    return response.status(HttpStatus.OK).json(walletDetail);
  }

  @Get('wallet/:id')
  @ApiOperation({
    summary: 'Listar Billetera por ID',
    description: 'Este endpoint es accesible por los roles: admin, conductor.',
  })
  async getWalletById(
    @Res() response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const wallet = await this.getWalletByIdUsecase.execute(id);
    return response.status(HttpStatus.OK).json(wallet);
  }

  @Get('detail/:id')
  @ApiOperation({
    summary: 'Listar Detalle de Billetera por ID',
    description: 'Este endpoint es accesible por los roles: admin, conductor.',
  })
  async getWalletDetail(
    @Res() response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const walletDetail = await this.getWalletDetailUsecase.execute(id);
    return response.status(HttpStatus.OK).json(walletDetail);
  }
}
