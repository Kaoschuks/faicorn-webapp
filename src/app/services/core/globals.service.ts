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

  process_image(url: string = "") {
    if(url !== '') {
      let url_arr = url.split('/');
      let image = url_arr[url_arr.length - 1];
      url_arr[url_arr.length - 1] = "f_auto";
      url_arr[url_arr.length] = image;
      url = url_arr.join('/');
      console.log(url)
    }
    return url;
  }
}
