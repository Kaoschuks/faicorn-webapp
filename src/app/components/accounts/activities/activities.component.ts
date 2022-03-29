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

  async ngOnInit() {
    await this.usersService.getUserActivities();
  }
}
