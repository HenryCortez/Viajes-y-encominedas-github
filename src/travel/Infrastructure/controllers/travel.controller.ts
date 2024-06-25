import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { CreateAssignmentHistoryDto } from 'src/travel/Application/dtos/create-assigment-history';
import { CreateTravelDto } from 'src/travel/Application/dtos/create-travel.dto';
import { CreateAssignmentHistoryUsecase } from 'src/travel/application/usecases/create-assigment-history.usecase';
import { CreateTravelUsecase } from 'src/travel/application/usecases/create-travel.usecase';
import { ListTravelsUsecase } from 'src/travel/application/usecases/list-travel.usecase';
import { UpdateAssignmentHistoryUsecase } from 'src/travel/application/usecases/update-assigment-history.usecase';
import { UpdateTravelUsecase } from 'src/travel/application/usecases/update-travel.usecase';

@Controller('travels/')
export class TravelController {
  constructor(
    private readonly createTravelUseCase: CreateTravelUsecase,
    private readonly listTravelsUseCase: ListTravelsUsecase,
    private readonly updateAssignmentHistoryUsecase: UpdateAssignmentHistoryUsecase,
    private readonly createAssignmentHistoryUsecase: CreateAssignmentHistoryUsecase,
    private readonly updateTravelUsecase: UpdateTravelUsecase,
  ) {}

  @Get()
  async listTravels(@Res() res) {
    const travels = await this.listTravelsUseCase.execute();

    return res.status(HttpStatus.OK).json(travels);
  }

  @Post('/create')
  async createTravel(@Res() res, @Body() travel: CreateTravelDto) {
    const createdTravel = await this.createTravelUseCase.execute(travel);

    return res.status(HttpStatus.CREATED).json(createdTravel);
  }

  @Post('/create/assigment')
    async createAssignmentHistory(@Res() res, @Body() assigment: CreateAssignmentHistoryDto) {
        const createdAssignmentHistory = await this.createAssignmentHistoryUsecase.execute(
        assigment,
        );
    
        return res.status(HttpStatus.CREATED).json(createdAssignmentHistory);
    }

    @Put('/update/assigment/:id')
    async updateAssignmentHistory(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() assigment: Partial<CreateAssignmentHistoryDto>) {
        const updatedAssignmentHistory = await this.updateAssignmentHistoryUsecase.execute(id,
        assigment,
        );
    
        return res.status(HttpStatus.OK).json(updatedAssignmentHistory);
    }

    @Put('/update/:id')
    async updateTravel(@Res() res, @Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
        
        const updatedTravel = await this.updateTravelUsecase.execute(id, status);
    
        return res.status(HttpStatus.OK).json(updatedTravel);
    }

   
}
