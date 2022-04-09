import { Injectable } from '@angular/core';
import { CanActivate,  Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GlobalsService } from '../services/core/globals.service';
import { UsersService } from '../services/features/users';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuardsService implements CanActivate {
  constructor(
    public globals: GlobalsService, 
    public uData: UsersService,
    public router: Router,
    public toastr: ToastrService
  ) {
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      // const user = await this.globals.storage.getItem('user');
      // // console.log(user)
      // var userLoggedIn = await this.uData.isLoggedOn();
      // if (user && userLoggedIn && user?.fullname === '' ) {
      //   this.toastr.warning('Please complete your profile', 'User Profile Required!')
      //   this.router.navigate(['/accounts/profile']);
      //   reject(false);
      // } else {
        resolve(true);
      // }
    })
  }

}