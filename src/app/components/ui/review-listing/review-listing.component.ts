import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'review-listing',
  templateUrl: './review-listing.component.html',
  styleUrls: ['./review-listing.component.css']
})
export class ReviewListingComponent implements OnInit {
  url: any = this._global.url.split('/')
  @Input() reviews: any = [];
  @Input() listings: any = [];
  reviewForm: FormGroup = new FormGroup({
    ads_id: new FormControl('', Validators.compose([Validators.required])),
    id: new FormControl('', Validators.compose([Validators.required])),
    type: new FormControl('', Validators.compose([Validators.required])),
    comments: new FormControl(''),
    likes: new FormControl(''),
    saved: new FormControl(''),
    dislikes: new FormControl('')
  })

  constructor(
    public _listingservices: ListingsService,
    private _global: GlobalsService,
    public usersService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }
  

  async addAComment(form: any, type: string){
    let userLoggedOn = await this.usersService.isLoggedOn();
    if (!userLoggedOn) this.toastr.warning('You need to log in before you can '+ type.charAt(0).toUpperCase(), 'Review Post Failed');

    let formData: any = form;
    (type === "like" ? formData.type = "like"
    : type === "dislike" ? formData.type = "dislike" : formData.type = "comments");
    formData.ads_id = this.reviews.uid;
    formData.id = this.reviews.id;
    // console.log(formData)
    const resp: any = await this._listingservices.addReview('/reviews', formData);
    (resp == 'review saved' ? this.toastr.success('Review Saved successfully.', 'Review Saved!') : this.toastr.error(resp.error, 'Review Save Error!'))
    this.reviewForm.reset();
    this.refreshReview();
  }

  async refreshReview(){
    await this._listingservices.getlistings(`/${this.url[this.url.length - 1]}`, ``, 'single')

  }
}
