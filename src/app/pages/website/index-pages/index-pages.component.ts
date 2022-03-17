import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
declare var HSCore: any;

@Component({
  selector: 'app-index-pages',
  templateUrl: './index-pages.component.html',
  styleUrls: ['./index-pages.component.css']
})
export class IndexPagesComponent implements OnInit, AfterViewInit {

  snowcount: Array<any> = Array.from(Array(1000).keys())
  result: any[] = [];
  focus: boolean = false;
  searchForm = this.formBuilder.group({
    search: ''
  });

  constructor(
    public _listingservices: ListingsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  async ngOnInit() {
    await this._listingservices.process_routes('/')
  }

  ngAfterViewInit() {
    HSCore.components.HSTyped.init('.js-typedjs')
  }

  generateID(id: string): string {
    return id.replace(' & ', '-').split(' ').join('').toLowerCase();
  }

  submitSearch(){
    this.router.navigate([`/search/${this.searchForm.value.search}`])
  }
}
