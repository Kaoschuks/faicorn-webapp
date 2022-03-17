import { Component, OnInit } from '@angular/core';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import { OrdersService } from 'src/app/services/features/orders/orders.service';

@Component({
  selector: 'accounts-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  ads: any[] = []

  constructor(
    private _listingservices: ListingsService,
    public ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.refreshAds();
    this.getOrders();
  }

  async refreshAds(){
    await this._listingservices.getlistings('', ``).then((resp: any) => {
      this.ads = resp.slice(0,3);
    }).catch((err: any) => {
      this.ads = []
    })
  }

  async getOrders(){
    const resp = await this.ordersService.getOrders();
    console.log(resp)
  }

}
