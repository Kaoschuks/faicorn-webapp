import { Component, Input, OnInit } from '@angular/core';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'listings-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  @Input() categories: any[] = []
  @Input() rangeTerm: number = 0
  filterArray: any[] = []

  constructor(
    public _listingservices: ListingsService
  ) { }

  ngOnInit() {
    for (let index = 0; index < this._listingservices.listings.length; index++) {
      this._listingservices.listings[index].price = Number(this._listingservices.listings[index]?.price?.replace('$',''));
      this.filterArray.push(this._listingservices.listings[index])
      console.log(this.filterArray)
    }
  }

  generateID(id: string): string {
    return id.replace(' & ', '-').split(' ').join('').toLowerCase();
  }

  onRangeChange(e: any){
    this.rangeTerm = e.target.value;
    // this._listingservices.listings =  this.filterArray.filter(item => { return (Number(item.prices) >= Number(e.target.value) && Number(item.prices) <= 7) ? item : this._listingservices.listings = this.filterArray})
  }
}
