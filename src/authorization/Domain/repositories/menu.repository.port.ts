import { Menu } from '@prisma/client';

export interface MenuRepositoryPort {
  createMenu(menu: Omit<Menu, 'id'>): Promise<Menu>;
  listMenus(): Promise<Menu[]>;
  updateMenu(id: number, menu: Partial<Menu>): Promise<Menu>;
  deleteMenu(menuId: number): Promise<boolean>;
  findByName(name: string): Promise<Menu>;
}
