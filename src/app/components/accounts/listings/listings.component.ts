import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'accounts-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  limit: any = 10
  constructor(
    private _global: GlobalsService,
    public _listingservices: ListingsService
  ){}

  async ngOnInit() {
    await this._listingservices.getlistings('', ``)
    console.log(this._listingservices?.listings);
  }

}
