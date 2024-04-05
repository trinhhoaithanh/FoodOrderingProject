import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseObject } from 'util/response-template';

@Injectable()
export class OrderItemsService {
  prisma = new PrismaClient();

//   async addItemToOrder(
//     order_id: number,
//     item_id: number,
//     quantity: number
//   ) {
//     let order = await this.prisma.orders.findUnique({
//       where: {
//         order_id,
//       },
//     });

//     if (order) {
//       let item = await this.prisma.items.findUnique({
//         where: {
//           item_id,
//         },
//       });

//       if (item) {
//         let newData = {
//             order_id:Number(order_id),

//             item_id: Number(item_id),

//             order_item_quantity: quantity,

//             order_item_price:
//               (
//                 await this.prisma.items.findUnique({
//                   where: { item_id },
//                 })
//               ).item_price * quantity
//           }
//         return this.prisma.orderitems.create({
//           data: newData
//         });
//       } else {
//         throw new NotFoundException(
//           responseObject(404, 'Request is invalid', 'Item is not found!'),
//         );
//       }
//     } else {
//       throw new NotFoundException(
//         responseObject(404, 'Request is invalid', 'Order is not found!'),
//       );
//     }
//   }

async getItemByOrderID(order_id: number){
  try {
    let checkOrder = await this.prisma.orderitems.findMany({
      where:{
         
        order_id:  Number(order_id)
    
      }
    })

    if (checkOrder) {
      return responseObject(200, 'Get Items by order id successfully!', checkOrder); 
    }
    else {
      throw new NotFoundException(responseObject(404, "Request is invalid", "Item is not found!")); 
    }
  }
  catch (err) {
    throw new HttpException(err.response, err.status);
  }
}
}
