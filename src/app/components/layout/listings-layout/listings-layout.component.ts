import { Component, OnChanges, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'listings-layout',
  templateUrl: './listings-layout.component.html',
  styleUrls: ['./listings-layout.component.css']
})
export class ListingsLayoutComponent implements OnInit {
  listings: any[] = [];

  constructor(
    public _listingservices: ListingsService,
    public _globals: GlobalsService
  ) { }

  ngOnInit() {
  }

}
