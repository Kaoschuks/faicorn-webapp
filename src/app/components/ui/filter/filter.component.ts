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

  async useFilter(){
    const listing: any = await this._listingservices.filterProducts(
      this._listingservices.filterSearch, this._listingservices.listings
    )
    this._listingservices.listings = listing
    if(listing.length == 0) this.clearFilter()
  }
}
