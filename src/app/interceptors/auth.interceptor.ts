import { Injectable } from '@angular/core';
import { Router, Routes, RouterStateSnapshot } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpUserEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // state: RouterStateSnapshot; 
    url: any; 
    cur: any;
    constructor(private router: Router, private jwtHelper: JwtHelperService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.cur = req.url;
        this.url = this.cur.split('/').slice(-2)[0]; // console.log(this.url);
        if (this.url === 'upload') {
            req = req.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ` + this.jwtHelper.tokenGetter()
                }
            });
        } else {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ` + this.jwtHelper.tokenGetter()
                }
            });
        }
        // this.error.request(req);
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
                // console.log(event);
                if (event.body && event.ok) {
                    console.log(event.body);
                }
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // access msg
                }
            }
            const msg = err.error.message || err.message;
        }));
    }
}

