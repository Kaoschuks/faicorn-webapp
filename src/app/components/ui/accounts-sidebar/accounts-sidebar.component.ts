import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'accounts-sidebar',
  templateUrl: './accounts-sidebar.component.html',
  styleUrls: ['./accounts-sidebar.component.css']
})
export class AccountsSidebarComponent implements OnInit {

  constructor(
    public _userService: UsersService,
  ) { }

  ngOnInit(): void {
  }

}
