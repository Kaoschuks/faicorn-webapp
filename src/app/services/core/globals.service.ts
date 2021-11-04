import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from './request-service';
import { StorageServices } from './storage-services.service';
declare var $ :any;

@Injectable({
  providedIn: 'root'
})
export class GlobalsService 
{
  loading: boolean = false;
  loader: any;
  url:string;
  title:string = '';
  constructor(
    public router: Router, private location: Location, public storage: StorageServices, public api: RequestService
  ) {
    this.url = this.location.path();
  }

  preloader = (status: string) =>
  {
    (status == 'show')
      ? this.loader.show()
      : this.loader.hide();
  }
}
