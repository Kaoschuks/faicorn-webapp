import { Injectable } from '@angular/core';
import { GlobalsService } from '../../core/globals.service';
import { RequestService } from '../../core/request-service';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  loader: boolean = false;
  listings: Array<any> = []
  listingInfo: any
  categories: Array<any> = []
  constructor(
      private api: RequestService,
      private globals: GlobalsService
  ) {}

  async getlistings(route: string = '/all', params: string = "", type: string = "all") {
    return await new Promise(async (resolve: any, reject: any) => {
      this.globals.spinner.show();
      try {
        const resp: any = await this.api.get('listings' + route + params)
        if(resp.error) throw new Error(resp.error);

        if(type == 'all') this.listings = resp.message;
        if(type == 'single') this.listingInfo = resp.message[0];

        this.globals.spinner.hide();
        resolve( resp.message);
      }catch(ex: any) {
        this.globals.spinner.hide();
        reject({
          error: ex.message || ex.error || ex || "Error getting listings"
        })
      }
    })
  }

  async getlistingscategories() {
    return await new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.get('listings/categories/all')
        if(resp.error) throw new Error(resp.error);

        this.categories = resp
        resolve(this.categories)
      }catch(ex: any) {
        reject({
          error: ex.message || ex.error || ex || "Error getting listings"
        })
      }
    })
  }
}
