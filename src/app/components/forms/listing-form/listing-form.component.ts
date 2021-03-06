import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import * as blobutil from 'blob-util';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { OrdersService } from 'src/app/services/features/orders/orders.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
declare var document: any, Tagin: any;

@Component({
  selector: 'listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css'],
})
export class ListingFormComponent implements OnInit {
  regions: any = environment.states;
  cities: any = [];
  subCategories: any[] = [];
  tags: any;
  edit: boolean = false;

  listingForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    description: new FormControl('', Validators.compose([Validators.required])),
    price: new FormControl('', Validators.compose([Validators.required])),
    category: new FormControl('', Validators.compose([Validators.required])),
    categoryname: new FormControl(''),
    subcategory: new FormControl(''),
    country: new FormControl(
      environment.country,
      Validators.compose([Validators.required])
    ),
    region: new FormControl('', Validators.compose([Validators.required])),
    city: new FormControl('', Validators.compose([Validators.required])),
    gender: new FormControl('', Validators.compose([Validators.required])),
    tags: new FormControl([], Validators.compose([Validators.required])),
    brands: new FormControl('', Validators.compose([Validators.required])),
    isFeatured: new FormControl(
      'false',
      Validators.compose([Validators.required])
    ),
    featuredName: new FormControl(''),
  });
  validation_messages = {
    name: [{ type: 'required', message: 'Ad Name is required.' }],
    description: [{ type: 'required', message: 'Description is required.' }],
    tags: [{ type: 'required', message: 'Tags is required.' }],
    brands: [{ type: 'required', message: 'Brands is required.' }],
    price: [{ type: 'required', message: 'Price is required.' }],
    images: [{ type: 'required', message: 'Images is required.' }],
  };
  images: Array<any> = [];

  constructor(
    public _orderservices: OrdersService,
    private _globals: GlobalsService,
    public _listingservices: ListingsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log(this.regions);
    // this._globals.spinner.show();
    this.tags = new Tagin(document.querySelector('.tagin'), {
      separator: ',', // default: ','
      duplicate: false, // default: false
      enter: true, // default: false
    });
    this._orderservices.paystackInfo.ref = Math.ceil(Math.random() * 10e10);
    this.onEditFillForm();
    // this._globals.spinner.hide();
  }

  open() {
    document.getElementById('imageUploader').click();
  }

  selectChange(type: string = 'city') {
    if (type === 'city') {
      const regions = this.regions[this.listingForm.value.country];
      this.cities = [];
      for (const key in regions) {
        if (
          regions[key]['state']['name'].toLowerCase() ==
          this.listingForm.value.region.toLowerCase()
        )
          this.cities = regions[key]['state']['locals'];
      }
    }

    if (type === 'category') {
      this.subCategories = [];
      for (const key in this._listingservices.categories) {
        if (
          this._listingservices.categories[key]['id'].toString() ===
          this.listingForm.value.category.toString()
        ) {
          this.subCategories =
            this._listingservices.categories[key]['subcategory'];
          this.listingForm.patchValue({
            subcategory: '',
            categoryname:
              this._listingservices.categories[key]['name'].toLowerCase(),
          });
        }
      }
    }
  }

  onFile(event: any) {
    event.preventDefault();
    if (event.target.files.length > 5)
      alert('You can`t choose more than 5 images');
    if (event.target.files.length <= 5) {
      this._globals.spinner.show();
      let promise = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        promise[i] = new Promise(async (resolve, reject) => {
          const file_resp: any = await this._listingservices.upload(file);
          if (file_resp.secure_url)
            resolve(
              file_resp.secure_url.replace(
                'image/upload/',
                'image/upload/w_auto,f_auto,q_auto/'
              )
            );
          if (file_resp.secure_url) reject(file_resp);
        });
      }
      Promise.all(promise)
        .then((values) => {
          this._globals.spinner.hide();
          this.images = values;
        })
        .catch((err: any) => {
          this._globals.spinner.hide();
          console.error(err);
        });
    }
    return false;
  }

  async onSubmit(form: any, ref: any = null) {
    // console.log(!this.listingForm.valid);
    // if (!this.listingForm.valid) return;
    this._globals.spinner.show();
    form.tags = this.tags.getTags();
    let formData: any = form;
    formData.images = this.images;

    // check if transaction was saved before continue for featured listings
    if (
      formData.isFeatured == 'true' &&
      this._globals.url.split('/')[3] !== 'edit'
    )
      await this._orderservices.saveTransaction(ref, formData.name);

    let ads_id = this._globals.url.split('/')[4];
    const resp =
      this._globals.url.split('/')[3] !== 'edit'
        ? await this.postListings(formData)
        : await this.editListings(ads_id, formData);
  }

  async onEditFillForm() {
    try {
      if (this._globals.url.split('/')[3] !== 'edit') return;
      this.edit = true;
      this._globals.spinner.show();
      let ads_id = this._globals.url.split('/')[4];

      const resp: any = await this._listingservices.getlistings(
        `/${ads_id}`,
        '',
        'single'
      );
      if (resp.error) throw new Error(resp.error);

      this.images = resp.images;
      this.tags.addTag(resp.tags);
      this.listingForm.patchValue(this._listingservices.listingInfo);
      this.selectChange();
      this.listingForm.patchValue({
        category: this._listingservices.listingInfo.category.id,
        isFeatured: this._listingservices.listingInfo.isFeatured.toString(),
      });
      this.selectChange('category');
      setTimeout(() => {
        this.listingForm.patchValue({
          city: this._listingservices.listingInfo.city,
          subcategory: this._listingservices.listingInfo.subcategory.id,
        });
      }, 100);
      this._globals.spinner.hide();
    } catch (ex: any) {
      this.toastr.error(ex.error || ex.message || ex, 'Error');
    }
  }

  async postListings(formData: any) {
    const resp: any = await this._listingservices.postlistings(formData);
    this._globals.spinner.hide();

    if (resp.error) this.toastr.error(resp.error, 'Ad Post Failed!');
    if (!resp.error) {
      this.listingForm.reset();
      this.listingForm.patchValue({
        country: environment.country,
        isFeatured: 'false',
      });
      this.images = [];
      this.toastr.success(
        resp.message || 'Ad posted successfully.',
        'Ad Posted!'
      );
    }
  }

  async editListings(ads_id: any, formData: any) {
    const resp: any = await this._listingservices.editlistingbyId(
      ads_id,
      formData
    );
    this._globals.spinner.hide();

    if (resp.error) this.toastr.error(resp.error, 'Ad Post Failed!');
    if (!resp.error) {
      this.images = [];
      this.toastr.success(
        resp.message || 'Ads Info updated successfully.',
        'Ad Updated!'
      );
    }
  }

  get name() {
    return this.listingForm.get('name');
  }

  get description() {
    return this.listingForm.get('description');
  }

  get price() {
    return this.listingForm.get('price');
  }

  get category() {
    return this.listingForm.get('category');
  }

  get categoryname() {
    return this.listingForm.get('categoryname');
  }

  get country() {
    return this.listingForm.get('country');
  }

  get region() {
    return this.listingForm.get('region');
  }

  get city() {
    return this.listingForm.get('price');
  }

  get gender() {
    return this.listingForm.get('gender');
  }

  get tag() {
    return this.listingForm.get('tags');
  }

  get brands() {
    return this.listingForm.get('price');
  }

  get isFeatured() {
    return this.listingForm.get('isFeatured');
  }
}
