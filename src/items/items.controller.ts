import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('api/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Implement the GET /api/items/{item_id} REST API to retrieve the details of a specific item.
  @Get(':item_id')
  async getItemDetail(@Param('item_id') item_id: number){
    return this.itemsService.getItemDetail(item_id);
  }

  
  
}
