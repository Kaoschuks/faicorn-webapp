import { Injectable } from '@angular/core';
import { CanActivate,  Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalsService } from '../services/core/globals.service';
import { UsersService } from '../services/features/users';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate {
  constructor(
    public globals: GlobalsService, 
    public uData: UsersService,
    public router: Router
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.uData.isLoggedOn()
      .then((res: boolean) => {
        if(!res) throw new Error('Access required');
        resolve(res);
      })
      .catch((err: boolean) => {
        console.log(err);
        this.router.navigateByUrl('/login')
        reject(err);
      });
    })
  }

}