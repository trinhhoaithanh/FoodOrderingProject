import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import {  PrismaClient } from '@prisma/client';
import { responseObject } from 'util/response-template';

@Injectable()
export class ItemsService {
  prisma = new PrismaClient();
  async getItemDetail(item_id:number){
    try {
      let checkItem = await this.prisma.items.findUnique({
        where:{
           
              item_id:  Number(item_id)
      
        }
      })

      if (checkItem) {
        return responseObject(200, 'Get Items by id successfully!', checkItem); 
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
