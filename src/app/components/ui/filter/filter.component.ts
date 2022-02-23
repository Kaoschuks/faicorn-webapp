import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'listings-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  @Input() categories: any[] = []
  // ageControl = new FormControl();
  public minTerm: number = 0;
  public maxTerm: number = 0;
  genderFilter = {
    men: false,
    women: false
  }
  brandFilter = {
    adidas: false,
    newBalance: false,
    nike: false,
    fredPerry: false,
    theNorthFace: false,
    gucci: false,
    mango: false
  }
  sizeFilter = {
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false
  }
  

  constructor(
    public _listingservices: ListingsService
  ) { }

  ngOnInit() {
  }

  generateID(id: string): string {
    return id.replace(' & ', '-').split(' ').join('').toLowerCase();
  }

  onRangeChange(e: any){
    (e.target.id === 'minRange' ? this.minTerm = Number(e.target.value) : this.maxTerm = Number(e.target.value))
    console.log(this.minTerm)
    console.log(this.maxTerm)

    console.log(this._listingservices.listings.filter(product => {
      return product.price >= this.minTerm
          && product.price <= this.maxTerm
    }))
  }

  clearAllFilter(){
    this.minTerm = 0;
    this.maxTerm = 0;
    this.genderFilter = {
      men: false,
      women: false
    }
    this.brandFilter = {
      adidas: false,
      newBalance: false,
      nike: false,
      fredPerry: false,
      theNorthFace: false,
      gucci: false,
      mango: false
    }
    this.sizeFilter = {
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false
    }
  
  }

  changeValue(value: any){
    value == !value;
    console.log(value)
 }}
