import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { OrdersService } from 'src/app/services/features/orders/orders.service';

@Component({
  selector: 'accounts-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  p: number = 1;
  limit: number = 5;

  constructor(
    public ordersService: OrdersService,
    private _globals: GlobalsService
  ) { }

  ngOnInit(){
    this._globals.spinner.show();
    this.getOrders();
    this._globals.spinner.hide();
  }

  async getOrders(){
    const resp = await this.ordersService.getOrders();
    // console.log(resp)
  }
}
