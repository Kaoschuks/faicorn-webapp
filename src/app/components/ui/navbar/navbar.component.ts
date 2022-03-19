import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  result: any[] = [];
  searchForm = this.formBuilder.group({
    search: ''
  });


  constructor(
    public _userService: UsersService,
    public _listingservices: ListingsService,
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  async ngOnInit() {
    await this._listingservices.getlistingscategories()
    const resp: any = await this._userService.isLoggedOn();
    this.removeShow();
  }

  submitSearch(){
    // console.log(this.searchForm.value.search);
    this.router.navigate([`/search/${this.searchForm.value.search}`])
    this.searchForm.reset();
  }

  removeShow(){
    console.log('Working')
    const nav = document.querySelector('nav');
    const showClass = document.getElementById('navbarsExample06') as HTMLElement;
    if (nav == document.activeElement) return
    showClass.classList.remove("show");
  }
}
