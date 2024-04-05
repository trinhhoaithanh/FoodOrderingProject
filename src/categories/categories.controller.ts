import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories(){
    return this.categoriesService.getAllCategories();
  }

  // Implement the GET/api/categories/{category_id}/items REST API to retrieves all items within a specific category.
  @Get(':category_id/items')
  async findItemByCategoryId(@Param('category_id')category_id: number):Promise<any>{
    return this.categoriesService.findItemByCategoryId(Number(category_id));
  }
  
}
