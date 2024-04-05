import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AddItemToOrderDto } from './dto/add-item-into-order.dto';
import { PrismaClient } from '@prisma/client';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  prisma = new PrismaClient();

  // Implement the GET /api/orders/{order_id}/fees REST API to retrieve the fees associated with the user's order, such as delivery fees.
  @Get(':order_id/fees')
  async getFeeByOrderId(@Param('order_id') order_id:number){
    return this.ordersService.getFeeByOrderId(+order_id);
  }

  // implement the DELETE /api/orders/:order_id/items/:item_id REST API
 

  @Post(':orderId/items')
  async addItemToOrder(
    @Body() addItemToOrderDto: AddItemToOrderDto,
    @Param('orderId') orderId: number,
  ): Promise<OrderItem> {
    const { itemId, quantity } = addItemToOrderDto;

    const item = await this.prisma.items.findUnique({ where: { item_id: Number(itemId) } });
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const order = await this.prisma.orders.findUnique({ where: { order_id: Number(orderId) } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const orderItem = await this.prisma.orderitems.create({
      data: {
        orders: { connect: { order_id: Number(orderId) } },
        items: { connect: { item_id: Number(itemId) } },
        order_item_quantity:quantity,
        order_item_price: item.item_price * quantity
      },
    });

    return orderItem;
  }


}
