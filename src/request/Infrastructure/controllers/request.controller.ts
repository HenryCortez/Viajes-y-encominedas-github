import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { Role } from 'src/authorization/Infrastructure/decorators/authorization.decorator';
import { AuthorizationGuard } from 'src/authorization/Infrastructure/guards/authorization.guard';
import { UpdateRequestDto } from 'src/request/Application/dtos/update-request.dto';
import { GetRequestsByEntrerpriseIdUsecase } from 'src/request/Application/usecases/get-requests-by-enterprise-id.usecase';
import { UpdateRequestUsecase } from 'src/request/Application/usecases/update-request.usecase';

@ApiTags('Solicitudes')
@ApiBearerAuth()
@Controller('requests/')
@Role('admin', 'secretaria')
@UseGuards(AuthGuard, AuthorizationGuard)
export class RequestController {
  constructor(
    private readonly getRequestsByEnterpriseIdUsecase: GetRequestsByEntrerpriseIdUsecase,
    private readonly updateRequestUsecase: UpdateRequestUsecase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Solicitudes por Empresa',
    description: 'Este endpoint es accesible por los roles: admin, secretaria.',
  })
  async getRequestsByEnterpriseId(@Res() res, @Req() request: Request) {
    const requests =
      await this.getRequestsByEnterpriseIdUsecase.execute(request);

    return res.status(HttpStatus.OK).json(requests);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar Solicitud',
    description: 'Este endpoint es accesible por los roles: admin, secretaria.',
  })
  async updateRequest(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateRequestDto,
  ) {
    const updatedRequest = await this.updateRequestUsecase.execute(id, request);

    return res.status(HttpStatus.OK).json(updatedRequest);
  }
}
