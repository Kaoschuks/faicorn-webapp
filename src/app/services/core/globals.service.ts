import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from './request-service';
import { StorageServices } from './storage-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $ :any;

@Injectable({
  providedIn: 'root'
})
export class GlobalsService 
{
  loading: boolean = false;
  loader: any;
  url: string = this.router.url;
  title:string = '';
  
  constructor(
    public spinner: NgxSpinnerService,
    public router: Router, private location: Location, public storage: StorageServices, public api: RequestService
  ) {
    this.location.onUrlChange(x => {
      this.url = x;
    });
  }

  preloader = (status: string) =>
  {
    (status == 'show')
      ? this.loader.show()
      : this.loader.hide();
  }
}
