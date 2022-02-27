import { Component, OnChanges, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';

@Component({
  selector: 'index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.css']
})
export class IndexLayoutComponent implements OnInit, OnChanges {

  constructor(
    public _globals: GlobalsService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this._globals.url)
  }

}
