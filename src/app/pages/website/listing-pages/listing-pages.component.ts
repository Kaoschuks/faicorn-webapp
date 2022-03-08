import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import { Event, NavigationStart} from '@angular/router';
import { FilterComponent } from 'src/app/components/ui/filter/filter.component';

@Component({
  selector: 'app-listing-pages',
  templateUrl: './listing-pages.component.html',
  styleUrls: ['./listing-pages.component.css']
})
export class ListingPagesComponent implements OnInit {

  url: any = this._global.url.split('/')
  constructor(
    private _global: GlobalsService,
    public _listingservices: ListingsService,
    public filterComponent: FilterComponent,
  ) { }

  async ngOnInit() {
    if(this.url.length === 3) await this._listingservices.getlistings('/all', `?brands=${this.url[this.url.length - 1]}&limit=1000`)
    if(this.url.length === 2) await this._listingservices.getlistings('/all', `?category=${this.url[this.url.length - 1]}&limit=1000`)
    if(this.url[1] === 'search') await this._listingservices.getSearch('/search', `${this.url[2]}`)
    this.getAds()
  }

  getAds() {
    this._global.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        let url = event.url.split('/');
        if(this.url.length === 3) await this._listingservices.getlistings('/all', `?brands=${url[url.length - 1]}&limit=1000`)
        if(this.url.length === 2) await this._listingservices.getlistings('/all', `?category=${url[url.length - 1]}&limit=1000`)
        if(this.url[1] === 'search') await this._listingservices.getSearch('/search', `${this.url[2]}`)
      }
    });
  }

}
