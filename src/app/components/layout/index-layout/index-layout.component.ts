import { Component, OnChanges, OnInit } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.css']
})
export class IndexLayoutComponent implements OnInit {

  constructor(
    public _globals: GlobalsService,
    public _listingservices: ListingsService,
  ) { }

  ngOnInit(): void {
		this._globals.router.events.subscribe(async (event) => {
		  if ( event instanceof NavigationStart ) {
        if(event.url == '/') await this._listingservices.getlistings('/all', `?limit=20&isFeatured=true`)
		  }
		});
  }

}
