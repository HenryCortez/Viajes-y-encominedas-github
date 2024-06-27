import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { Role } from 'src/authorization/Infrastructure/decorators/authorization.decorator';
import { AuthorizationGuard } from 'src/authorization/Infrastructure/guards/authorization.guard';
import { CreateEnterpriseDto } from 'src/enterprise/Application/dtos/create-enterprise.dto';
import { CreateEnterpriseUsecase } from 'src/enterprise/Application/usecases/create-enterprise.usecase';
import { DeleteEnterpriseUsecase } from 'src/enterprise/Application/usecases/delete-enterprise.usecase';
import { GetEnterpriseByIdUsecase } from 'src/enterprise/Application/usecases/get-enterprise-by-id.usecase';
import { ListEnterprisesUsecase } from 'src/enterprise/Application/usecases/list-enterprises.usecase';
import { UpdateEnterpriseUsecase } from 'src/enterprise/Application/usecases/update-enterprise.usecase';

@ApiTags('Empresas')
@ApiBearerAuth()
@Controller('enterprise/')
@Role('admin', 'secretaria')
@UseGuards(AuthGuard, AuthorizationGuard)
export class EnterpriseController {
  constructor(
    private readonly createEnterpriseUsecase: CreateEnterpriseUsecase,
    private readonly listEnterprisesUsecase: ListEnterprisesUsecase,
    private readonly getEnterpriseByIdUsecase: GetEnterpriseByIdUsecase,
    private readonly deleteEnterpriseUsecase: DeleteEnterpriseUsecase,
    private readonly updateEnterpriseUsecase: UpdateEnterpriseUsecase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Empresas',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async listEnterprises(@Res() res) {
    const enterpises = await this.listEnterprisesUsecase.execute();
    return res.status(HttpStatus.OK).json(enterpises);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar Empresa por ID',
    description: 'Este endpoint es accesible por los roles: admin, secretaria.',
  })
  async getEnterpriseById(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const enterprise = await this.getEnterpriseByIdUsecase.execute(id);
    return res.status(HttpStatus.OK).json(enterprise);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Crear Empresa',
    description: 'Este endpoint es accesible por los roles: admin, secretaria.',
  })
  async createEnterprise(@Res() res, @Body() enterprise: CreateEnterpriseDto) {
    const createdEnterprise =
      await this.createEnterpriseUsecase.execute(enterprise);
    return res.status(HttpStatus.CREATED).json(createdEnterprise);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar Empresa',
    description: 'Este endpoint es accesible por los roles: admin, secretaria.',
  })
  async updateEnterprise(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
    @Body() enterprise: CreateEnterpriseDto,
  ) {
    const updatedEnterprise = await this.updateEnterpriseUsecase.execute(
      id,
      enterprise,
    );
    return res.status(HttpStatus.OK).json(updatedEnterprise);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar Empresa',
    description: 'Este endpoint es accesible por los roles: admin, secretaria.',
  })
  async deleteEnterprise(@Res() res, @Param('id', ParseIntPipe) id: number) {
    await this.deleteEnterpriseUsecase.execute(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
