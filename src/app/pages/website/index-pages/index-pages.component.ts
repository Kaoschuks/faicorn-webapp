import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
declare var HSCore: any;

@Component({
  selector: 'app-index-pages',
  templateUrl: './index-pages.component.html',
  styleUrls: ['./index-pages.component.css']
})
export class IndexPagesComponent implements OnInit, AfterViewInit {

  snowcount: Array<any> = Array.from(Array(1000).keys())
  constructor(
    public _listingservices: ListingsService,
  ) { }

  async ngOnInit() {
    await this._listingservices.getlistings('/all', `?limit=20&isFeatured=true`)
  }

  ngAfterViewInit() {
    HSCore.components.HSTyped.init('.js-typedjs')
  }

  generateID(id: string): string {
    return id.replace(' & ', '-').split(' ').join('').toLowerCase();
  }

  sendData(e: any){
    // console.log(e.target.value);
    let query: string = e.target.value;
    let matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this._listingservices.listings = []
      return;
    }
  }
}
