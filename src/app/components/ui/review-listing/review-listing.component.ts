import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'review-listing',
  templateUrl: './review-listing.component.html',
  styleUrls: ['./review-listing.component.css']
})
export class ReviewListingComponent implements OnInit {

  @Input() reviews: any = [];
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
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    
  }

  async addAComment(form: any, type: any){
    let userLoggedOn = await this.usersService.isLoggedOn();
    if (!userLoggedOn) return;

    let thumbsup = document.querySelector('.bi-hand-thumbs-up');
    let thumbsdown = document.querySelector('.bi-hand-thumbs-down');
    
    let formData: any = form;
    (type === "like" ? formData.type = "like"
    : type === "dislike" ? formData.type = "dislike" : formData.type = "comments");
    formData.ads_id = this._global.url.split('/')[3];
    formData.id = this.reviews.id;
    console.log(formData)
    const resp = await this._listingservices.addReview('/reviews', formData);
    console.log(resp);
    this.reviewForm.reset();
  }
}
