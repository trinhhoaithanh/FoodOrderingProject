import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrderItemDto } from 'src/order-items/dto/create-order-item.dto';
import { responseObject } from 'util/response-template';
import { ApplyVoucherDto } from './dto/apply-voucher.dto';
import { connect } from 'http2';

@Injectable()
export class OrdersService {
  prisma = new PrismaClient();


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

    

  async addItemToOrder(orderId: number, itemId: number, quantity: number): Promise<any> {
    let order = await this.prisma.orders.findUnique({
      where:{
        order_id: Number(orderId)
      }
    })
    if(order){
      let item = await this.prisma.items.findUnique({
        where:{
          item_id:Number(itemId)
        }
      })

      if(item){
        let addedItem = await this.prisma.orderitems.create({
          data: {
            order_id: orderId,
            item_id: itemId,
            order_item_quantity: quantity,
            order_item_price: item.item_price * quantity,
          },
        });
        console.log(addedItem);

        return responseObject(201, "add item into order successfully!", addedItem);
      }
      else{
        throw new NotFoundException(responseObject(404, 'Request is invalid', "item not found!")); 
      }
    }
    else{
      throw new NotFoundException(responseObject(404, 'Request is invalid', "Order not found!")); 
    }
}


  async deleteItemInOrder(order_id:number, item_id:number){
    let order = await this.prisma.orders.findUnique({
      where:{
        order_id: Number(order_id)
      }
    })
    if(order){
      let item = await this.prisma.items.findUnique({
        where:{
          item_id:Number(item_id)
        }
      })

      if(item){
        await this.prisma.orderitems.deleteMany({
          where:{
            order_id,
            item_id
          }
        })

        return responseObject(201, "delete item successfully!");
      }
      else{
        throw new NotFoundException(responseObject(404, 'Request is invalid', "item not found!")); 
      }
    }
    else{
      throw new NotFoundException(responseObject(404, 'Request is invalid', "Order not found!")); 
    }
  }

  //apply voucher
  async applyVoucherToOrder(order_id: number, voucher_id: number) {
    let order = await this.prisma.orders.findUnique({
      where:{
        order_id
      }
    })

    if(order){
      let voucher = await this.prisma.vouchers.findUnique({
        where:{
          voucher_id
        }
      })

      if(voucher){
        const discount = order.order_price * voucher.discount_percentage/100;
        
        const newTotalPrice = order.order_price - discount;

      
      
        let newPrice = await this.prisma.orders.update({
          where: { order_id: Number(order_id) },
          data: { 

            order_price: newTotalPrice },
        });
        return responseObject(200, "Update order price successfully!", newPrice);
      }
      else{
        throw new NotFoundException(responseObject(404, 'Request is invalid', "Voucher not found!")); 
      }
    }
    else{
      throw new NotFoundException(responseObject(404, 'Request is invalid', "Order not found!")); 
    }
  }
}
