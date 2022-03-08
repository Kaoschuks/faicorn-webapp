import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { GlobalsService } from './services/core/globals.service';

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
    private globals: GlobalsService
  ) {

  }

  ngOnInit(){
    this.router.events.subscribe((event) => {
      if ( event instanceof NavigationStart ) {
        this.globals.spinner.show()
      }
      if ( event instanceof NavigationEnd || event instanceof NavigationCancel ) {
        this.globals.spinner.hide()
      }
    });
  }

}
