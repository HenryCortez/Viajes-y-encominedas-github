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
} from '@nestjs/common';
import { CreateEnterpriseDto } from 'src/enterprise/Application/dtos/create-enterprise.dto';
import { CreateEnterpriseUsecase } from 'src/enterprise/Application/usecases/create-enterprise.usecase';
import { DeleteEnterpriseUsecase } from 'src/enterprise/Application/usecases/delete-enterprise.usecase';
import { GetEnterpriseByIdUsecase } from 'src/enterprise/Application/usecases/get-enterprise-by-id.usecase';
import { ListEnterprisesUsecase } from 'src/enterprise/Application/usecases/list-enterprises.usecase';
import { UpdateEnterpriseUsecase } from 'src/enterprise/Application/usecases/update-enterprise.usecase';

@Controller('enterprise/')
export class EnterpriseController {
  constructor(
    private readonly createEnterpriseUsecase: CreateEnterpriseUsecase,
    private readonly listEnterprisesUsecase: ListEnterprisesUsecase,
    private readonly getEnterpriseByIdUsecase: GetEnterpriseByIdUsecase,
    private readonly deleteEnterpriseUsecase: DeleteEnterpriseUsecase,
    private readonly updateEnterpriseUsecase: UpdateEnterpriseUsecase,
  ) {}

  @Get()
  async listEnterprises(@Res() res) {
    const enterpises = await this.listEnterprisesUsecase.execute();
    return res.status(HttpStatus.OK).json(enterpises);
  }

  @Get(':id')
  async getEnterpriseById(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const enterprise = await this.getEnterpriseByIdUsecase.execute(id);
    return res.status(HttpStatus.OK).json(enterprise);
  }

  @Post('/create')
  async createEnterprise(@Res() res, @Body() enterprise: CreateEnterpriseDto) {
    const createdEnterprise =
      await this.createEnterpriseUsecase.execute(enterprise);
    return res.status(HttpStatus.CREATED).json(createdEnterprise);
  }

  @Put(':id')
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
  async deleteEnterprise(@Res() res, @Param('id', ParseIntPipe) id: number) {
    await this.deleteEnterpriseUsecase.execute(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
