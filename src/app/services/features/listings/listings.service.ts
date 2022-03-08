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

        if(type == 'all') this.listings = resp.message.results;
        if(type == 'single') this.listingInfo = resp.message.results[0];

        this.loader.listings = false;
        resolve(this.listings);
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
        // console.log(this.categories)
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
          // this.globals.spinner.show()
          try {
            const myFormData = new FormData();
            myFormData.append("file", file);
            myFormData.append("upload_preset", environment.cloudinary.upload_preset);
            myFormData.append("skipAuthorization", "true");

            const resp: any = await this.api.upload(``, myFormData);
            if (resp.error) throw new Error(resp.error || resp);

            // this.globals.spinner.hide()
            resolve(resp)
          } catch (ex: any) {
              // this.globals.spinner.hide()
              console.log(ex)
              reject({ error: ex.error || ex.message || ex })
          }
      })
  }

  async getSearch(route: string = '/search', params: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      this.loader.listings = true;
      try {
        let data = { search: params}
        const resp: any = await this.api.post('listings' + route, data)
        if(resp.error) throw new Error(resp.error);

        this.loader.listings = false;
        this.listings = resp.message;
        // console.log(resp.message)
        resolve(resp.message);
      }catch(ex: any) {
        this.loader.listings = false;
        reject({
          error: ex.message || ex.error || ex || "Error getting search listings"
        })
      }
    })
  }

  async postlistings(data: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      this.loader.listings = true;
      try {
        const resp: any = await this.api.post('listings', data)
        if(resp.error) throw new Error(resp.error);

        resolve(resp.message);
      }catch(ex: any) {
        this.loader.listings = false;
        reject({
          error: ex.message || ex.error || ex || "Error posting listings"
        })
      }
    })
  }

  async deletelisting(id: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      this.loader.listings = true;
      try {
        const resp: any = await this.api.delete(`listings/${id}`)
        if(resp.error) throw new Error(resp.error);

        resolve(resp.message);
      }catch(ex: any) {
        this.loader.listings = false;
        reject({
          error: ex.message || ex.error || ex || "Error deleting listing"
        })
      }
    })
  }

  async getlistingbyId(params: string = "", type: string = "all") {
    return await new Promise(async (resolve: any, reject: any) => {
      this.loader.listings = true;
      try {
        const resp: any = await this.api.get('listings/' + params)
        if(resp.error) throw new Error(resp.error);

        resolve(resp.message.results[0]);
      }catch(ex: any) {
        this.loader.listings = false;
        reject({
          error: ex.message || ex.error || ex || "Error getting listing by id"
        })
      }
    })
  }

  async editlistingbyId(params: string = "", data: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      this.loader.listings = true;
      try {
        const resp: any = await this.api.update('listings/' + params, data)
        console.log(resp.message)

        if(resp.error) throw new Error(resp.error);

        resolve(resp.message);
      }catch(ex: any) {
        this.loader.listings = false;
        reject({
          error: ex.message || ex.error || ex || "Error putting listing by id"
        })
      }
    })
  }

}
