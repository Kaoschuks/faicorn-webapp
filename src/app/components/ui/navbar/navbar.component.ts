import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
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
  ) { document.addEventListener('click', this.offClickHandler.bind(this)); this.onRouterNavigate();}

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
    const nav = document.querySelector('nav');
    const showClass = document.getElementById('navbarsExample06') as HTMLElement;
    if (nav == document.activeElement) return
    showClass.classList.remove("show");
  }

  offClickHandler(event:any) {
    let collapse = document.getElementById('navbarsExample06');
    if (!collapse?.contains(event.target)) { // check click origin
        collapse?.classList.remove('show');
    }
  }

  onRouterNavigate(){
    let collapse = document.getElementById('navbarsExample06');
    collapse?.classList.remove('show');
    // this.router.events.subscribe((event) => {
    //   if(event instanceof NavigationStart){
    //     console.log(collapse?.classList.contains('show'))
    //     if (!collapse?.classList.contains('show')) return;
    //   }
    // })
  }
}
