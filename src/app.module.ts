import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { ItemsModule } from './items/items.module';
import { OptionsModule } from './options/options.module';
import { FeesModule } from './fees/fees.module';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
  imports: [CustomersModule, OrdersModule, CategoriesModule, VouchersModule, ItemsModule, OptionsModule, FeesModule, OrderItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
