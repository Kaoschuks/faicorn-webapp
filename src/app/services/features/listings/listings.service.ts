import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { GlobalsService } from '../../core/globals.service';
import { RequestService } from '../../core/request-service';
import { UsersService } from '../users';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  loader: any = {
    category: false,
    listings: false,
    detail: false,
  };

  filters: any;
  filterSearch: any = {
    tags: {},
    price: 0,
    cities: {},
    regions: {},
    brands: {},
    categories: {},
    subcategories: {},
    countries: 'Nigeria',
    gender: {},
  };

  listings: Array<any> = [];
  oldlistings: Array<any> = [];
  listingInfo: any;
  categories: Array<any> = [];
  constructor(
    private _user: UsersService,
    private api: RequestService,
    private globals: GlobalsService,
    private toastr: ToastrService
  ) {}

  async process_routes(url: any) {
    if (url.length === 2 && url[1] == '')
      await this.getlistings('/all', `?limit=20`);
    if (url.length === 2 && url[1] != '')
      await this.getlistings(
        '/all',
        `?category=${url[url.length - 1]}&limit=1000`
      );
    if (url.length === 3 && url[1] != 'accounts')
      await this.getlistings(
        '/all',
        `?brands=${url[url.length - 1]}&limit=1000`
      );
    if (url[1] === 'search') await this.getSearch('/search', `${url[2]}`);
  }

  async getlistings(
    route: string = '/all',
    params: string = '',
    type: string = 'all'
  ) {
    return await new Promise(async (resolve: any, reject: any) => {
      this.loader.listings = true;
      this.oldlistings = this.listings = [];
      this.listingInfo = {};
      this.filterSearch = {
        tags: {},
        price: 0,
        cities: {},
        regions: {},
        brands: {},
        categories: {},
        subcategories: {},
        countries: 'Nigeria',
        gender: {},
      };
      try {
        const resp: any = await this.api.get('listings' + route + params);
        if (resp.error) throw new Error(resp.error);

        if (type == 'all') {
          this.listings = resp.message.results;
          this.oldlistings = resp.message.results;
        }

        if (type == 'single') this.listingInfo = resp.message.results[0];

        this.filters = resp.message.filter;
        let tags: any = [];
        for (let tag in this.filters['tags']) {
          tags.push(this.filters['tags'][tag]);
        }
        this.filters['tags'] = tags;

        this.loader.listings = false;
        resolve(type == 'single' ? this.listingInfo : this.listings);
      } catch (ex: any) {
        this.loader.listings = false;
        console.log(ex);
        this.toastr.error(ex, 'Listings Error');
        reject({
          error: ex.message || ex.error || ex || 'Error getting listings',
        });
      }
    });
  }

  async getlistingscategories() {
    return await new Promise(async (resolve: any, reject: any) => {
      this.loader.category = true;
      try {
        const resp: any = await this.api.get('listings/categories/all');
        if (resp.error) throw new Error(resp.error);

        this.categories = resp;
        this.loader.category = false;
        resolve(this.categories);
      } catch (ex: any) {
        this.loader.category = false;
        console.log(ex);
        this.toastr.error(ex, 'Listing Categories Error');
        reject({
          error:
            ex.message || ex.error || ex || 'Error getting listing categories',
        });
      }
    });
  }

  async upload(file: any) {
    return await new Promise(async (resolve, reject) => {
      // this.globals.spinner.show()
      try {
        const myFormData = new FormData();
        myFormData.append('file', file);
        myFormData.append(
          'upload_preset',
          environment.cloudinary.upload_preset
        );
        myFormData.append('skipAuthorization', 'true');

        const resp: any = await this.api.upload(``, myFormData);
        if (resp.error) throw new Error(resp.error || resp);

        // this.globals.spinner.hide()
        resolve(resp);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        this.toastr.error(ex, 'Image Upload Error');
        reject({ error: ex.error || ex.message || ex });
      }
    });
  }

  async getSearch(route: string = '/search', params: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      this.loader.listings = true;
      try {
        let data = { search: params };
        const resp: any = await this.api.post('listings' + route, data);
        if (resp.error) throw new Error(resp.error);

        this.loader.listings = false;
        this.listings = resp.message?.results;
        // console.log(resp.message)
        resolve(resp.message);
      } catch (ex: any) {
        this.loader.listings = false;
        console.log(ex);
        this.toastr.error(ex, 'Listings Search Error');
        reject({
          error:
            ex.message || ex.error || ex || 'Error getting search listings',
        });
      }
    });
  }

  async postlistings(data: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      this.globals.spinner.show();
      try {
        const resp: any = await this.api.post('listings', data);
        if (resp.error) throw new Error(resp.error);

        this.globals.spinner.hide();
        resolve(resp);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        this.toastr.error(ex, 'Listings Post Error');
        reject({
          error: ex.message || ex.error || ex || 'Error posting listings',
        });
      }
    });
  }

  async deletelisting(id: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      this.globals.spinner.show();
      try {
        const resp: any = await this.api.delete(`listings/${id}`);
        if (resp.error) throw new Error(resp.error);

        this.globals.spinner.hide();
        resolve(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        this.toastr.error(ex, 'Listing Delete Error');
        reject({
          error: ex.message || ex.error || ex || 'Error deleting listing',
        });
      }
    });
  }

  async editlistingbyId(params: string = '', data: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      this.globals.spinner.show();
      try {
        const resp: any = await this.api.update('listings/' + params, data);
        if (resp.error) throw new Error(resp.error);

        this.globals.spinner.hide();
        resolve(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        this.toastr.error(ex, 'Listings Edit Error');
        reject({
          error: ex.message || ex.error || ex || 'Error putting listing by id',
        });
      }
    });
  }

  async addReview(route: string = '/reviews', data: any, type: string = 'all') {
    return await new Promise(async (resolve: any, reject: any) => {
      this.globals.spinner.show();
      try {
        this.globals.storage
          .getItem('user')
          .then(async (res: any) => {
            if (res) {
              this._user.user = res;
              const jwt = await this.globals.storage.getItem('jwt');
              this.api.setJwt(jwt.access_token);
              const resp: any = await this.api.post('listings' + route, {
                ads_id: data.ads_id,
                id: data.id,
                type: data.type,
                likes: data.type == 'like' ? 'true' : '[]',
                saved: data.type == 'save' ? 'true' : '[]',
                comments: data.type == 'comments' ? data.comments : '[]',
                dislikes: data.type == 'dislike' ? 'true' : '[]',
              });

              if (resp.error) throw new Error(resp.error);

              this.globals.spinner.hide();
              resolve(resp.message);
            } else {
              throw new Error('You are not logged in');
            }
          })
          .catch((ex: any) => {
            this.globals.spinner.hide();
            this.globals.router.navigateByUrl('/login');
          });
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        this.toastr.error(ex, 'Listing Review Error');
        reject({
          error: ex.message || ex.error || ex || 'Error adding reviews',
        });
      }
    });
  }

  async filterProducts(filter: any, products: any) {
    return await new Promise(async (resolve, reject) => {
      let _products: any = products.filter((e: any) => {
        for (let i in filter.tags) {
          if (e.tags.includes(i) && filter.tags[i] == true) return e;
        }
        for (let i in filter.subcategories) {
          if (e.subcategories.includes(i) && filter.subcategories[i] == true)
            return e;
        }
        for (let i in filter.regions) {
          if (e.region == i && filter.regions[i] == true) return e;
        }
        for (let i in filter.cities) {
          if (e.city == i && filter.cities[i] == true) return e;
        }
        for (let i in filter.gender) {
          if (e.gender == i && filter.gender[i] == true) return e;
        }
        for (let i in filter.brands) {
          if (e.brands == i && filter.brands[i] == true) return e;
        }
      });
      resolve(_products);
    });
  }
}
