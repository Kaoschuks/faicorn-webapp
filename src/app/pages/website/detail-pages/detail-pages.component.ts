import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart} from '@angular/router';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'app-detail-pages',
  templateUrl: './detail-pages.component.html',
  styleUrls: ['./detail-pages.component.css']
})
export class DetailPagesComponent implements OnInit {

  showContact: boolean = false;
  url: any = this._global.url.split('/')
  constructor(
    private _global: GlobalsService,
    public _listingservices: ListingsService,
  ) { }

  async ngOnInit() {
    await this._listingservices.getlistings('/all', `?brands=${this.url[this.url.length - 2]}&limit=1000`)
    await this._listingservices.getlistings(`/${this.url[this.url.length - 1]}`, ``, 'single')
    this.getAds()
  }

  getAds() {
    this._global.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        let url = event.url.split('/');
        await this._listingservices.getlistings('/all', `?brands=${url[url.length - 2]}&limit=1000`)
        await this._listingservices.getlistings(`/${url[url.length - 1]}`, ``, 'single')
      }
    });
  }

  toogle() {
    console.log(this._listingservices?.listingInfo?.user)
    this.showContact = (!this.showContact) ? true : false ;
  }

}
