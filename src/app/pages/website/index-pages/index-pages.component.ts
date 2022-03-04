import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterComponent } from 'src/app/components/ui/filter/filter.component';
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
    public filterComponent: FilterComponent,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  async ngOnInit() {
    await this._listingservices.getlistings('/all', `?limit=20`)
  }

  ngAfterViewInit() {
    HSCore.components.HSTyped.init('.js-typedjs')
  }

  generateID(id: string): string {
    return id.replace(' & ', '-').split(' ').join('').toLowerCase();
  }

  async sendData(e: any){
    let query: string = e.target.value;
    let matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this._listingservices.listings = []
      return;
    }
    // console.log(e.target.value);

    this.result = await this._listingservices.getSearch('/search', query) as any[];
    let displayResults = document.querySelector('.results') as HTMLElement;
    
    (this.focus && this.result !== [] ? displayResults.style.display = 'block' : console.log(this.focus))    
    displayResults.style.display = 'block';
    // for (let index = 0; index < this.result.length; index++) {
    //   console.log(this.result[index])
    //   var optionElement = document.createElement("option");
    //   optionElement.innerHTML = this.result[index].name;
    //   let wait = document.getElementById('search-results') as HTMLElement;
    //   wait.appendChild(optionElement)
    // }
  }

  submitSearch(){
    // console.log(this.searchForm.value.search);
    this.router.navigate([`/search/${this.searchForm.value.search}`])
  }
}
