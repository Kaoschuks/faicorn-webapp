import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import * as blobutil from 'blob-util';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { OrdersService } from 'src/app/services/features/orders/orders.service';
declare var document: any;

@Component({
  selector: 'listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})
export class ListingFormComponent implements OnInit {
  reference = '';
  title = '';
  subCategories: any[] = [];
  listingForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.compose([ Validators.required ])),
    description: new FormControl("", Validators.compose([ Validators.required ])),
    price: new FormControl("", Validators.compose([ Validators.required ])),
    category: new FormControl("", Validators.compose([ Validators.required ])),
    subcategory: new FormControl(""),
    country: new FormControl("", Validators.compose([ Validators.required ])),
    region: new FormControl("", Validators.compose([ Validators.required ])),
    city: new FormControl("", Validators.compose([ Validators.required ])),
    gender: new FormControl("", Validators.compose([ Validators.required ])),
    tags: new FormControl([], Validators.compose([ Validators.required ])),
    brands: new FormControl("", Validators.compose([ Validators.required ])),
    isFeatured: new FormControl(false),
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
    public _listingservices: ListingsService
  ) { }

  ngOnInit() {
    this._orderservices.paystackInfo.ref = Math.ceil(Math.random() * 10e10);
  }

  open() {
    document.getElementById('imageUploader').click();
    console.log('click');
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
    let formData: any = form;
    formData.image = this.images;
    formData.isFeatured = Boolean(formData.isFeatured);

    // check if transaction was saved before continue for featured listings
    if(formData.isFeatured == true) await this._orderservices.saveTransaction(ref)

    // console.log(formData)
    const resp = await this._listingservices.postlistings(formData);
    console.log(resp)
    this.listingForm.reset();
  }

  async selectSubCategories(){
    let category: any = await this.listingForm.controls['category'].value;
    if (category == '') return;

    // filter subcategory using category name
    let filteredCat: any = await this._listingservices.categories.filter( e => { return e?.name == category});
    this.subCategories = filteredCat[0]?.subcategory;
    // console.log(filteredCat[0]?.subcategory);
  }
}
