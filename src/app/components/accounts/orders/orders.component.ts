import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/features/orders/orders.service';

@Component({
  selector: 'accounts-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  p: number = 1;
  limit: number = 10;

  constructor(
    public ordersService: OrdersService
  ) { }

  ngOnInit(){
    this.getOrders();
  }

  async getOrders(){
    const resp = await this.ordersService.getOrders();
    // console.log(resp)
  }
}
