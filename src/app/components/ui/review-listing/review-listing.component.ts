import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'review-listing',
  templateUrl: './review-listing.component.html',
  styleUrls: ['./review-listing.component.css']
})
export class ReviewListingComponent implements OnInit {

  @Input() reviews: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
