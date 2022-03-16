import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'accounts-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  constructor(
    public usersService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.usersService.getUserActivities()
  }

  // async deleteUser(){
  //   if(confirm('Are you sure you want to delete your account permanently?') == true){
  //     await this.usersService.deleteUser();
  //     await this.usersService.logout();
  //     this.toastr.success('User deleted successfully.', 'Delete Ad!');
	//   }
  // }
}
