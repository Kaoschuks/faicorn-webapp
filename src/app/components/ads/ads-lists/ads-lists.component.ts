import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'ads-listing',
  templateUrl: './ads-lists.component.html',
  styleUrls: ['./ads-lists.component.css']
})
export class AdsListsComponent implements OnInit {

  p: number = 1;
  @Input() ads: any = [];
  adscount: Array<any> = Array.from(Array(20).keys())
  @Input() limit: number = 10;
  // @Input() minTerm: number = 0;
  // @Input() maxTerm: number = 0;

  constructor(
    public _global: GlobalsService,
    public _listingservices: ListingsService
  ) { }

  ngOnInit(): void {
  }

}
