import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'accounts-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  async deleteUser(){
    await this.usersService.deleteUser();
    await this.usersService.logout();
  }
}
