import { Injectable } from '@angular/core';
import { RequestService } from '../core/request-service';
import { GlobalsService } from '../core/globals.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService 
{
    loader: boolean = false;
    constructor(
        private api: RequestService,
        private globals: GlobalsService
    ) {}

    async uploadImage(id: any, form: any) {
        return this.api.uploadImg(`files/users${id}/upload`, form)
    }

    async isLoggedOn(): Promise<any> {
        return await new Promise((resolve: any, reject: any) => {
            this.globals.storage.getItem('userdata')
            .then(async (res: any) => {
                if(res) {
                    // this.userInfo = res;
                    const jwt = await this.globals.storage.getItem('jwt')
                    this.api.setJwt(jwt)
                    resolve(true);
                } else {
                    reject(false)
                }
            })
            .catch((ex: any) => {
                reject(false)
            });
        })
    }
}