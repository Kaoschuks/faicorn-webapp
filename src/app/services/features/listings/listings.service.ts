import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalsService } from '../../core/globals.service';
import { RequestService } from '../../core/request-service';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  loader: any = {
    category: false,
    listings: false,
    detail: false
  };
  listings: Array<any> = []
  listingInfo: any
  categories: Array<any> = []
  constructor(
      private api: RequestService,
      private globals: GlobalsService
  ) {}

  async getlistings(route: string = '/all', params: string = "", type: string = "all") {
    return await new Promise(async (resolve: any, reject: any) => {
      this.loader.listings = true;
      try {
        const resp: any = await this.api.get('listings' + route + params)
        if(resp.error) throw new Error(resp.error);

        if(type == 'all') this.listings = resp.message;
        if(type == 'single') this.listingInfo = resp.message[0];

        this.loader.listings = false;
        // console.log(resp.message)
        let filterArray = [];
        for (let index = 0; index < resp.message.length; index++) {
          resp.message[index].price = Number(resp.message[index]?.price?.replace('$',''));
          filterArray.push(resp.message[index])
          console.log(filterArray)
        }
    
        resolve(filterArray);
      }catch(ex: any) {
        this.loader.listings = false;
        reject({
          error: ex.message || ex.error || ex || "Error getting listings"
        })
      }
    })
  }

  async getlistingscategories() {
    return await new Promise(async (resolve: any, reject: any) => {
      this.loader.category = true;
      try {
        const resp: any = await this.api.get('listings/categories/all')
        if(resp.error) throw new Error(resp.error);

        this.categories = resp
        this.loader.category = false;
        resolve(this.categories)
      }catch(ex: any) {
        this.loader.category = false;
        reject({
          error: ex.message || ex.error || ex || "Error getting listings"
        })
      }
    })
  }

  async upload(file: any) {
      return await new Promise(async (resolve, reject) => {
          this.globals.spinner.show()
          try {
              const myFormData = new FormData();
              myFormData.append("file", file);
              myFormData.append("upload_preset", environment.cloudinary.upload_preset);
              myFormData.append("skipAuthorization", "true");

              const resp: any = await this.api.upload(``, myFormData);
              if (resp.error) throw new Error(resp.error || resp);

              this.globals.spinner.hide()
              console.log(resp)
          } catch (ex: any) {
              this.globals.spinner.hide()
              console.log(ex)
              reject({ error: ex.error || ex.message || ex })
          }
      })
  }

}
