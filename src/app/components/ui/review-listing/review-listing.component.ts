import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'review-listing',
  templateUrl: './review-listing.component.html',
  styleUrls: ['./review-listing.component.css']
})
export class ReviewListingComponent implements OnInit {

  @Input() reviews: any = [];
  reviewForm: FormGroup = new FormGroup({
    ads_id: new FormControl('', Validators.compose([Validators.required])),
    type: new FormControl('', Validators.compose([Validators.required])),
    comments: new FormControl(''),
    likes: new FormControl(''),
    saved: new FormControl(''),
    dislikes: new FormControl('')
  })

  constructor(
    public _listingservices: ListingsService,
    private _global: GlobalsService,
  ) { }

  ngOnInit(): void {
    
  }

  async addAComment(form: any){
    let formData: any = form;
    formData.type = 'comments';
    formData.ads_id = this._global.url.split('/')[3];
    const resp = await this._listingservices.addReview('/reviews', formData);
    console.log(resp)
    this.reviewForm.reset();
  }
}
