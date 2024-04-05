import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':customer_id/vouchers')
  async getVoucherListByCustomerId(@Param('customer_id') customer_id: number){
    return this.customersService.getVoucherListByCustomerId(customer_id);
  }
}
