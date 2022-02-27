import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'app-accounts-layout',
  templateUrl: './accounts-layout.component.html',
  styleUrls: ['./accounts-layout.component.css']
})
export class AccountsLayoutComponent implements OnInit {

  constructor(
    public _userService: UsersService
  ) { }

  ngOnInit(): void {
  }

}
