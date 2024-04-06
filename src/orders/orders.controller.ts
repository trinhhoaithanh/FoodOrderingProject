import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PrismaClient } from '@prisma/client';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  prisma = new PrismaClient();

  // Implement the GET /api/orders/{order_id}/fees REST API to retrieve the fees associated with the user's order, such as delivery fees.
  @Get(':order_id/fees')
  async getFeeByOrderId(@Param('order_id') order_id:number){
    return this.ordersService.getFeeByOrderId(+order_id);
  }

  // implement the DELETE /api/orders/:order_id/items/:item_id REST API to remove item in an order
  @Delete(':order_id/items/:item_id')
  async deleteItemInOrder(@Param('order_id') order_id:number, @Param('item_id') item_id:number){
    return this.ordersService.deleteItemInOrder(Number(order_id), Number(item_id))
  }
 

  @Post(':order_id/items')
  async addItemToOrder(
   @Param('order_id') order_id:number, @Body() body)
   {
    const {item_id, quantity} = body;
    return this.ordersService.addItemToOrder(Number(order_id), Number(item_id), Number(quantity));
  }

  //add voucher to order
  @Post(':order_id/vouchers')
  async applyVoucherToOrder(@Param('order_id') order_id: number, @Body() body: any) {
    const { voucher_id } = body;
    return this.ordersService.applyVoucherToOrder(Number(order_id), Number(voucher_id));
  }
  

}
