import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import * as blobutil from 'blob-util';
declare var document: any;

@Component({
  selector: 'listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})
export class ListingFormComponent implements OnInit {

  listingForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.compose([ Validators.required ])),
    description: new FormControl("", Validators.compose([ Validators.required ])),
    price: new FormControl("", Validators.compose([ Validators.required ])),
    category: new FormControl("", Validators.compose([ Validators.required ])),
    tags: new FormControl("", Validators.compose([ Validators.required ])),
    brands: new FormControl("", Validators.compose([ Validators.required ])),
    isFeatured: new FormControl(false),
    featuredName: new FormControl(""),
    images: new FormControl([], Validators.compose([ Validators.required ])),
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
    public _listingservices: ListingsService
  ) { }

  ngOnInit(): void {
  }

  open() {
    document.getElementById('imageUploader').click();
    console.log('click');
  }

  onFile(event: any) {
    event.preventDefault()
    // if(event.target.files.length > 5) this._globals.notifyAlert('', 'You can`t choose more than 5 images')
    if(event.target.files.length <= 5)  {
      // this._globals.spinner.show();
      let fileArr: any = [], promise = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this._listingservices.upload(file)
        promise[i] = new Promise(async (resolve, reject) => {
          const image:any = await blobutil.blobToDataURL(file)
          fileArr.push(image)
          resolve('resolved');
        })
      }
      Promise.all(promise)
      .then((values) => {
        // this._globals.spinner.hide();
        console.log(values)
        this.images = fileArr;
      })
      .catch((err: any) => {
        console.error(err);
      });
    }
    return false;
  }

  async onSubmit(form: any){
    let formData: any = form;
    const resp = await this._listingservices.postlistings(formData)
  }
}
