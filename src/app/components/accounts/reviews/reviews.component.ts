import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'accounts-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  p: number = 1;
  limit: number = 5;
  reviews: any[] = [];

  constructor(
    public usersService: UsersService,
    private _globals: GlobalsService
  ) {}

  ngOnInit() {
    this._globals.spinner.show();
    this.getReviews();
  }

  async getReviews() {
    const resp: any = await this.usersService.getUserInfo();
    this.reviews = resp?.reviews.comments;
    this._globals.spinner.hide();
  }
}
