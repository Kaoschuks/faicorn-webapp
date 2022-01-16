import { Injectable } from '@angular/core';
import { RequestService } from '../core/request-service';
import { GlobalsService } from '../core/globals.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    loader: boolean = false;
    user: any;
    constructor(
        private api: RequestService,
        private globals: GlobalsService,
        private auth: AngularFireAuth,
    ) { }

    async uploadImage(id: any, form: any) {
        return this.api.uploadImg(`files/users${id}/upload`, form)
    }

    async isLoggedOn(): Promise<any> {
        return await new Promise((resolve: any, reject: any) => {
            this.globals.storage.getItem('user')
                .then(async (res: any) => {
                    if (res) {
                        this.user = res;
                        const jwt = await this.globals.storage.getItem('jwt')
                        // console.log(jwt)
                        this.api.setJwt(jwt.access_token)
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

    async socialregister(provider: 'GoogleAuthProvider' | 'FacebookAuthProvider') {
        return await new Promise(async (resolve, reject) => {
            try {
                let _provider: any = null;
                if (provider === 'GoogleAuthProvider') _provider = new firebase.default.auth.GoogleAuthProvider();
                if (provider === 'FacebookAuthProvider') _provider = new firebase.default.auth.FacebookAuthProvider();
                const result: any = await this.auth.signInWithPopup(_provider);

                resolve({
                    fullname: '',
                    username: result.user.providerData[0]['displayName'],
                    email: result.user.providerData[0]['email'],
                    image: result.user.providerData[0]['photoURL'],
                    uid: result.user.providerData[0]['uid']
                });

            } catch (ex: any) {
                reject({
                    error: ex.message || ex.error || ex
                })
            }
        })
    }

    async register(body: any) {
        return await new Promise(async (resolve, reject) => {
            try {
                const data: any = await this.api.post(`register`, body);
                if (data.message !== "user registered" || data.error || !data) throw new Error(data.message || data.error || "Can't register user");

                resolve("register");
            } catch (ex: any) {
                this.globals.spinner.hide();
                reject({
                    error: ex.message || ex.error || ex
                });
            }
        });
    }

    public async login(form: any, type: string = 'email') {
        return await new Promise(async (resolve, reject) => {
            this.globals.spinner.show();
            try {
                let url: string = (type == 'email') ? `login` : `socialauth`;
                /// send post request to login endpoint
                const login: any = await this.api.post(url, form);
                if (login.error) throw new Error(login.error || login);

                this.globals.storage.saveItem('jwt', login);

                const jwt = await this.globals.storage.getItem('jwt');
                this.api.setJwt(jwt.access_token);

                await this.getUserInfo()

                this.globals.spinner.hide();
                resolve("logged in")
            } catch (ex: any) {
                this.globals.spinner.hide();
                reject({ error: ex.error || ex.message || ex })
            }
        })
    }

    async getUserInfo() {
        return await new Promise(async (resolve, reject) => {
            try {
                const user: any = await this.api.get(`user`);
                if (user.error) throw new Error(user.error || user);

                this.user = user;
                this.globals.storage.saveItem('user', user);
                resolve(user)
            } catch (ex: any) {
                console.log(ex)
                reject({ error: ex.error || ex.message || ex })
            }
        })
    }

    async logout() {
        await this.auth.signOut();
        await this.globals.storage.clear();
        this.user = undefined;
        this.api.setJwt(null);
        this.globals.router.navigate(['/login']);
    }
}