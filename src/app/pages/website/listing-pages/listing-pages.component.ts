import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import { Event, NavigationStart} from '@angular/router';

@Component({
  selector: 'app-listing-pages',
  templateUrl: './listing-pages.component.html',
  styleUrls: ['./listing-pages.component.css']
})
export class ListingPagesComponent implements OnInit {

  url: any = this._global.url.split('/')
  constructor(
    private _global: GlobalsService,
    public _listingservices: ListingsService
  ) { }

  async ngOnInit() {
    await this._listingservices.process_routes(this.url);
  }

}
