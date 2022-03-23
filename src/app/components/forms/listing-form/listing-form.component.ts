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
  styleUrls: ['./listing-form.component.css']
})
export class ListingFormComponent implements OnInit {
  regions: any = environment.states
  cities: any = []
  subCategories: any[] = [];
  tags: any;

  listingForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.compose([ Validators.required ])),
    description: new FormControl("", Validators.compose([ Validators.required ])),
    price: new FormControl("", Validators.compose([ Validators.required ])),
    category: new FormControl("", Validators.compose([ Validators.required ])),
    subcategory: new FormControl(""),
    country: new FormControl(environment.country, Validators.compose([ Validators.required ])),
    region: new FormControl("", Validators.compose([ Validators.required ])),
    city: new FormControl("", Validators.compose([ Validators.required ])),
    gender: new FormControl("", Validators.compose([ Validators.required ])),
    tags: new FormControl([], Validators.compose([ Validators.required ])),
    brands: new FormControl("", Validators.compose([ Validators.required ])),
    isFeatured: new FormControl('false', Validators.compose([ Validators.required ])),
    featuredName: new FormControl("")
  });
  validation_messages = {
    name: [
      { type: "required", message: "Ad Name is required." }
    ],
    description: [
      { type: "required", message: "Description is required." }
    ],
    tags: [
      { type: "required", message: "Tags is required." }
    ],
    brands: [
      { type: "required", message: "Brands is required." }
    ],
    price: [
      { type: "required", message: "Price is required." }
    ],
    images: [
      { type: "required", message: "Images is required." }
    ]
  };
  images: Array<any> = []

  constructor(
    public _orderservices: OrdersService,
    private _globals: GlobalsService,
    public _listingservices: ListingsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this._globals.spinner.show();
    this.tags = new Tagin(document.querySelector('.tagin'), {
      separator: ',', // default: ','
      duplicate: false, // default: false
      enter: true, // default: false
    })
    this._orderservices.paystackInfo.ref = Math.ceil(Math.random() * 10e10);
    this.onEditFillForm();
    this._globals.spinner.hide();
  }

  open() {
    document.getElementById('imageUploader').click();
  }

  selectChange(type: string = 'city') {

    if(type === 'city') {
      const regions = this.regions[this.listingForm.value.country];
      this.cities = []
      for (const key in regions) {
        if (regions[key]['state']['name'] == this.listingForm.value.region) this.cities = regions[key]['state']['locals']
      }
    }

    if(type === 'category') {
      this.subCategories = []
      for (const key in this._listingservices.categories) {
        if(this._listingservices.categories[key]['name'] === this.listingForm.value.category) this.subCategories = this._listingservices.categories[key]['subcategory']
      }
    }

  }

  onFile(event: any) {
    event.preventDefault()
    if(event.target.files.length > 5) alert('You can`t choose more than 5 images')
    if(event.target.files.length <= 5)  {
      this._globals.spinner.show();
      let fileArr: any = [], promise = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        promise[i] = new Promise(async (resolve, reject) => {
          const file_resp: any = await this._listingservices.upload(file);
          const image:any = await blobutil.blobToDataURL(file)
          fileArr.push(image)
          if(file_resp.secure_url) resolve(file_resp.secure_url)
          if(file_resp.secure_url) reject(file_resp)
        })
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
    form.tags = this.tags.getTags()
    let formData: any = form;
    formData.images = this.images;

    // check if transaction was saved before continue for featured listings
    // console.log(formData)
    if(formData.isFeatured == 'true') await this._orderservices.saveTransaction(ref, formData.name)

    let ads_id = this._globals.url.split('/')[4];
    const resp = (this._globals.url.split('/')[3] !== 'edit' ? await this._listingservices.postlistings(formData) : await this._listingservices.editlistingbyId(ads_id, formData));
    (resp == 'ads info updated' ? this.toastr.success('Ads Info updated successfully.', 'Ad Updated!') : this.toastr.success('Ad posted successfully.', 'Ad Posted!'))
    this.listingForm.reset();
    this.images = [];
  }

  async onEditFillForm() {
    try {
      if (this._globals.url.split('/')[3] !== 'edit') return;
      let ads_id = this._globals.url.split('/')[4];
  
      const resp: any = await this._listingservices.getlistings(`/${ads_id}`, '', 'single');
      if(resp.error) throw new Error(resp.error);

      this.images = resp.images;
      this.tags.addTag(resp.tags)
      this.listingForm.patchValue(this._listingservices.listingInfo)
      this.listingForm.patchValue({
        category: this._listingservices.listingInfo.category.name
      })
      this.selectChange()
      this.selectChange('category')

    } catch(ex: any) {
      this.toastr.error(ex.error || ex.message || ex, 'Error')
    }
  }
}
