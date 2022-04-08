import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'ads-grid',
  templateUrl: './ads-grid.component.html',
  styleUrls: ['./ads-grid.component.css']
})
export class AdsGridComponent implements OnInit {

  @Input() ads: any = [];
  adscount: Array<any> = Array.from(Array(20).keys())
  constructor(
    public _global: GlobalsService,
    public _listingservices: ListingsService
  ) { }

  ngOnInit(): void {
  }

}
