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
import { Menu } from '@prisma/client';
import { CreateMenuDto } from '../../../Application/dto/menu/create-menu.dto';
import { UpdateMenuDto } from '../../../Application/dto/menu/update-menu.dto';
import {
  CreateMenuUsecase,
  DeleteMenuUsecase,
  FindByNameUsecase,
  ListMenusUsecase,
  UpdateMenuUsecase,
} from '../../../Application/usecases';

@Controller('menus/')
export class MenuController {
  constructor(
    private readonly createMenuUsecase: CreateMenuUsecase,
    private readonly deleteMenuUsecase: DeleteMenuUsecase,
    private readonly listMenusUsecase: ListMenusUsecase,
    private readonly updateMenuUsecase: UpdateMenuUsecase,
    private readonly findByNameMenuUsecase: FindByNameUsecase,
  ) {}

  @Get()
  async listMenus(@Res() request): Promise<Menu[]> {
    const menus = await this.listMenusUsecase.execute();
    return request.status(HttpStatus.OK).json(menus);
  }

  @Get(':name')
  async findByName(@Res() request, name: string): Promise<Menu> {
    const searchedMenu = await this.findByNameMenuUsecase.execute(name);
    return request.status(HttpStatus.OK).json(searchedMenu);
  }

  @Post('/create')
  async createMenu(@Res() request, @Body() menu: CreateMenuDto): Promise<Menu> {
    const createdMenu = await this.createMenuUsecase.execute(menu);
    return request.status(HttpStatus.CREATED).json(createdMenu);
  }

  @Put(':id')
  async updateMenu(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() menu: Partial<UpdateMenuDto>,
  ): Promise<Menu> {
    const updatedMenu = await this.updateMenuUsecase.execute(id, menu);
    return request.status(HttpStatus.OK).json(updatedMenu);
  }

  @Delete(':id')
  async deleteMenu(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    await this.deleteMenuUsecase.execute(id);
    return request.status(HttpStatus.NO_CONTENT).send();
  }
}
