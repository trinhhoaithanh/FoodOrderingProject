import { Controller, Get, Param, Post } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';

@Controller('api/order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}
  // Implement the GET /api/items/{order_id} REST API to retrieve all items within the user's current order.
  @Get(':order_id')
  async getItemByOrderId(@Param('order_id') order_id: number){
    return this.orderItemsService.getItemByOrderID(Number(order_id));
  }
}
