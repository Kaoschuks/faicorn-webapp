import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'accounts-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  async deleteUser() {
    if (
      confirm('Are you sure you want to delete your account permanently?') ==
      true
    ) {
      await this.usersService.deleteUser();
      await this.usersService.logout();
      this.toastr.success('User Account deleted successfully.', 'Delete Ad!');
    }
  }
}
