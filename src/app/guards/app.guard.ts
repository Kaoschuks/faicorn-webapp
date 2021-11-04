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
      let page = 'login' ;
      this.uData.isLoggedOn()
      .then((res: boolean) => {
        if(!res) {
          this.router.navigateByUrl(page)
          reject(res);
        } 
        resolve(res);
      })
      .catch((err: boolean) => {
        console.log(err);
        this.router.navigateByUrl(page)
        reject(err);
      });
    })
  }

}