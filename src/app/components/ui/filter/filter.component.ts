import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'listings-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() categories: any[] = []
  @Input() filterData: any
  @Output() filters = new EventEmitter<any>();
  url: any = this._globals.url.split('/');

  constructor(
    public _listingservices: ListingsService,
    private _globals: GlobalsService
  ) { }

  ngOnInit() {
  }

  generateID(id: string): string {
    return id.replace(' & ', '-').split(' ').join('').toLowerCase();
  }

  clearFilter(){
    this._listingservices.filterSearch = {
      "tags": {},
      "price": 0,
      "cities": {},
      "regions": {},
      "brands": {},
      "categories": {},
      "subcategories": {},
      "countries": "Nigeria",
      "gender": {}
    }
    this._listingservices.listings = this._listingservices.oldlistings
  }

<<<<<<< HEAD
  async pushToArray(objects: any, array: any[]){
    for (var prop in objects) {
      if (objects.hasOwnProperty(prop)) {
        var innerObj: any = {};
        innerObj[prop] = objects[prop];
        array.push(innerObj[prop]);
      }
    }
  }

  async useFilter(data: any){
    const query = (<HTMLInputElement>document.getElementById(data?.gender)).checked;
    if (query) {
      this.filter.push(data);
    } else {
      var index = this.filter.indexOf(data); 
      if (index !== -1){
        this.filter.splice(index, 1);
      }
    }
    this._listingservices.filterListings(this._listingservices.listings, this.filter)
    // console.log(this.filter)
=======
  async useFilter(){
    const listing: any = await this._listingservices.filterProducts(
      this._listingservices.filterSearch, this._listingservices.listings
    )
    this._listingservices.listings = listing
    if(listing.length == 0) this.clearFilter()
>>>>>>> aa7490be2c24d1a40810607b19c88e0cfb793821
  }
}
