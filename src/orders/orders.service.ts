import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrderItemDto } from 'src/order-items/dto/create-order-item.dto';
import { responseObject } from 'util/response-template';
import { ApplyVoucherDto } from './dto/apply-voucher.dto';
import { connect } from 'http2';

@Injectable()
export class OrdersService {
  prisma = new PrismaClient();

//   async addItemToOrder(
//     order_id: number,
//     createOrderItemDto: CreateOrderItemDto,
//   ): Promise<any> {
//     const { item_id, order_item_quantity } = createOrderItemDto;

//     let item = await this.prisma.items.findUnique({
//       where: {
//         item_id: item_id,
//       },
//     });

//     let order = await this.prisma.orders.findUnique({
//       where: {
//         order_id: order_id,
//       },
//     });

//     if (!item || !order) {
//       throw new Error('Item or order not found');
//     }

//     await this.prisma.orderitems.create({
//     });
//   }

    async getFeeByOrderId(order_id: number){
        try {
            let checkOrder = await this.prisma.fees.findMany({
                where:{
                    order_id:order_id
                }
            })
      
            if (checkOrder) {
              return responseObject(200, 'Get fess by order_id successfully!', checkOrder); 
            } else {
              throw new NotFoundException(responseObject(404, 'Request is invalid', "Fees not found!")); 
            }
          } catch (err) {
            throw new HttpException(err.response, err.status);
          }

    
    }

    // async applyVoucher(order_id:number, applyVoucherDto:ApplyVoucherDto){
    //   const {voucher_id} = applyVoucherDto;

    //   const order = await this.prisma.orders.findUnique({
    //     where:{
    //       order_id
    //     }
    //   });

    //   // Check if the order exists
    //   if(!order){
    //     throw new Error('Order not found');
    //   }

    //   // Check if the customer has the voucher
    //   const voucher = await this.prisma.vouchers.findUnique({
    //     where:{
    //       voucher_id
    //     },
    //     include:{
    //       customers:true
    //     }
    //   })

    //   if(!voucher || voucher.customers.customer_id != order.customer_id){
    //     throw new Error('Voucher not found or not associated with the customer');
    //   }

    //   await this.prisma.orders.update({
    //     where:{
    //       order_id:Number(order_id)
    //     },
    //     data:{
        
    //     }
    //   })


    // }

  //     async addItemToOrder(
  //       item,
  //   order_id: number
    
  // ) {
  //   let {item_id, quantity} = item;
  //   let order = await this.prisma.orders.findUnique({
  //     where: {
  //       order_id,
  //     },
  //   });

  //   if (order) {
  //     let item = await this.prisma.items.findUnique({
  //       where: {
  //         item_id,
  //       },
  //     });

  //     if (item) {
  //       let newData = {
  //           order_id:Number(order_id),

  //           item_id: Number(item_id),

  //           order_item_quantity: Number(quantity),

  //           order_item_price:
  //             (
  //               await this.prisma.items.findUnique({
  //                 where: { item_id },
  //               })
  //             ).item_price * quantity
  //         }
  //       return this.prisma.orderitems.create({
  //         data: newData
  //       });
  //     } else {
  //       throw new NotFoundException(
  //         responseObject(404, 'Request is invalid', 'Item is not found!'),
  //       );
  //     }
  //   } else {
  //     throw new NotFoundException(
  //       responseObject(404, 'Request is invalid', 'Order is not found!'),
  //     );
  //   }
  // }
}
