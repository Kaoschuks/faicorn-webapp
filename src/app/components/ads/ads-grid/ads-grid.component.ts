import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ads-grid',
  templateUrl: './ads-grid.component.html',
  styleUrls: ['./ads-grid.component.css']
})
export class AdsGridComponent implements OnInit {

  @Input() ads: any = [];
  // adscount: Array<any> = Array.from(Array(20).keys())
  constructor() { }

  ngOnInit(): void {
  }

}
