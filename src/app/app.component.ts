import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { GlobalsService } from './services/core/globals.service';
import { ListingsService } from './services/features/listings/listings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showsplash: boolean = true
  title = 'frontend';
  routerSubscription: any;

  constructor(
    private router: Router,
    public _listingservices: ListingsService,
    private globals: GlobalsService
  ) {

  }

  ngOnInit(){
    this.router.events.subscribe(async (event) => {
      if ( event instanceof NavigationStart ) {
        this._listingservices.process_routes(event.url.split('/'));
      }
      if ( event instanceof NavigationEnd || event instanceof NavigationCancel ) {
        this.globals.spinner.hide()
      }
    });
  }

}
