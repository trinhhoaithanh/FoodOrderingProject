import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseObject } from 'util/response-template';

@Injectable()
export class CustomersService {
    prisma = new PrismaClient();

    async getVoucherListByCustomerId(customer_id: number){
        try {
            let checkCustomer = await this.prisma.vouchers.findMany({
                where:{
                    customer_id:Number(customer_id)
                }
            })
      
            if (checkCustomer) {
              return responseObject(200, 'Get voucher by customer_id successfully!', checkCustomer); 
            } else {
              throw new NotFoundException(responseObject(404, 'Request is invalid', "Customer not found!")); 
            }
          } catch (err) {
            throw new HttpException(err.response, err.status);
          }
    }
}
