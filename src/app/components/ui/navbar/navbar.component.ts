import { Component, OnInit } from '@angular/core';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  result: any[] = [];

  constructor(
    public _userService: UsersService,
    public _listingservices: ListingsService,
  ) { }

  async ngOnInit() {
    await this._listingservices.getlistingscategories()
  }

  async sendData(e: any){
    let query: string = e.target.value;
    let matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this._listingservices.listings = []
      return;
    }
    this.result = await this._listingservices.getSearch('/search', query) as any[];
    let displayResults = document.querySelector('.nav-results') as HTMLElement;
    displayResults.style.display = 'block';

  }
}
