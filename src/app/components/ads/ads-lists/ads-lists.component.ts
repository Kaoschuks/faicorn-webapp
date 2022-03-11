import { Component, Input, OnInit } from '@angular/core';
import { FilterComponent } from '../../ui/filter/filter.component';

@Component({
  selector: 'ads-listing',
  templateUrl: './ads-lists.component.html',
  styleUrls: ['./ads-lists.component.css']
})
export class AdsListsComponent implements OnInit {

  p: number = 1;
  @Input() ads: any = [];
  @Input() limit: number = 10;
  // @Input() minTerm: number = 0;
  // @Input() maxTerm: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
