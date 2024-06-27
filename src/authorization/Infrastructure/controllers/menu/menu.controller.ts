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
import { Menu } from '@prisma/client';
import { CreateMenuDto } from 'src/authorization/Application/dto/menu/create-menu.dto';
import { UpdateMenuDto } from 'src/authorization/Application/dto/menu/update-menu.dto';
import {
  CreateMenuUsecase,
  DeleteMenuUsecase,
  FindByNameUsecase,
  ListMenusUsecase,
  UpdateMenuUsecase,
} from 'src/authorization/Application/usecases';
import { Role } from '../../decorators/authorization.decorator';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { AuthorizationGuard } from '../../guards/authorization.guard';

@ApiTags('Menus')
@ApiBearerAuth()
@Controller('menus/')
@Role('admin')
@UseGuards(AuthGuard, AuthorizationGuard)
export class MenuController {
  constructor(
    private readonly createMenuUsecase: CreateMenuUsecase,
    private readonly deleteMenuUsecase: DeleteMenuUsecase,
    private readonly listMenusUsecase: ListMenusUsecase,
    private readonly updateMenuUsecase: UpdateMenuUsecase,
    private readonly findByNameMenuUsecase: FindByNameUsecase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar menus',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async listMenus(@Res() request): Promise<Menu[]> {
    const menus = await this.listMenusUsecase.execute();
    return request.status(HttpStatus.OK).json(menus);
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Buscar menu por nombre',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async findByName(@Res() request, name: string): Promise<Menu> {
    const searchedMenu = await this.findByNameMenuUsecase.execute(name);
    return request.status(HttpStatus.OK).json(searchedMenu);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Crea un nuevo menu',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async createMenu(@Res() request, @Body() menu: CreateMenuDto): Promise<Menu> {
    const createdMenu = await this.createMenuUsecase.execute(menu);
    return request.status(HttpStatus.CREATED).json(createdMenu);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar menu',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async updateMenu(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() menu: Partial<UpdateMenuDto>,
  ): Promise<Menu> {
    const updatedMenu = await this.updateMenuUsecase.execute(id, menu);
    return request.status(HttpStatus.OK).json(updatedMenu);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar menu',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async deleteMenu(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    await this.deleteMenuUsecase.execute(id);
    return request.status(HttpStatus.NO_CONTENT).send();
  }
}
