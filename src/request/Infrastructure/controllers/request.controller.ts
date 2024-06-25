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
} from '@nestjs/common';
import { UpdateRequestDto } from 'src/request/Application/dtos/update-request.dto';
import { GetRequestsByEntrerpriseIdUsecase } from 'src/request/Application/usecases/get-requests-by-enterprise-id.usecase';
import { UpdateRequestUsecase } from 'src/request/Application/usecases/update-request.usecase';

@Controller('requests/')
export class RequestController {
  constructor(
    private readonly getRequestsByEnterpriseIdUsecase: GetRequestsByEntrerpriseIdUsecase,
    private readonly updateRequestUsecase: UpdateRequestUsecase,
  ) {}

  @Get()
  async getRequestsByEnterpriseId(@Res() res, @Req() request: Request) {
    const requests =
      await this.getRequestsByEnterpriseIdUsecase.execute(request);

    return res.status(HttpStatus.OK).json(requests);
  }

  @Put(':id')
  async updateRequest(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateRequestDto,
  ) {
    const updatedRequest = await this.updateRequestUsecase.execute(id, request);

    return res.status(HttpStatus.OK).json(updatedRequest);
  }
}
