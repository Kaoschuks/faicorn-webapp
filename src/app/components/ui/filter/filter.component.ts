import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'listings-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() categories: any[] = []
  url: any = this._globals.url.split('/');
  filterData: any;
  tagsData: any[] = [];
  filter: any[] = [];

  constructor(
    public _listingservices: ListingsService,
    public _globals: GlobalsService
  ) { }

  async ngOnInit() {
    if(this.url[1] === 'search') await this._listingservices.getSearch('/search', `${this.url[2]}`).then((res: any) => {
      this.filterData = res;
      this.pushToArray(res?.filter?.tags, this.tagsData)
      // console.log(res?.filter)
      // console.log(this.tagsData)
    })
  }

  generateID(id: string): string {
    return id.replace(' & ', '-').split(' ').join('').toLowerCase();
  }

  // onRangeChange(e: any){
  //   (e.target.id === 'minRange' ? this.minTerm = Number(e.target.value) : this.maxTerm = Number(e.target.value))
  //   console.log(this.minTerm)
  //   console.log(this.maxTerm)
  //   this.filter = true;
  //   this.filteredArray =  this._listingservices.listings.filter(product => {
  //     return product.price >= this.minTerm
  //         && product.price <= this.maxTerm
  //   })

  //   console.log(this._listingservices.listings.filter(product => {
  //     return product.price >= this.minTerm
  //         && product.price <= this.maxTerm
  //   }))
  // }

  clearAllFilter(){
  }

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
    const query = (<HTMLInputElement>document.getElementById(data)).checked;
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
  }
}
