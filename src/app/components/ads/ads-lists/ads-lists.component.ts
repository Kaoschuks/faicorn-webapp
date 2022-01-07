import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ads-listing',
  templateUrl: './ads-lists.component.html',
  styleUrls: ['./ads-lists.component.css']
})
export class AdsListsComponent implements OnInit {

  p: number = 1;
  @Input() ads: any = [];
  @Input() limit: number = 10;
  constructor() { }

  ngOnInit(): void {
  }

}
