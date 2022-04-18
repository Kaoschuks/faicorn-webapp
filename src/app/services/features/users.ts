import { Injectable } from '@angular/core';
import { RequestService } from '../core/request-service';
import { GlobalsService } from '../core/globals.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  loader: boolean = false;
  user: any;
  activities: any;
  constructor(
    private api: RequestService,
    private globals: GlobalsService,
    private auth: AngularFireAuth,
    private toastr: ToastrService
  ) {}

  async isLoggedOn(): Promise<any> {
    return await new Promise((resolve: any, reject: any) => {
      this.globals.storage
        .getItem('user')
        .then(async (res: any) => {
          if (res) {
            this.user = res;
            const jwt = await this.globals.storage.getItem('jwt');
            // console.log(jwt)
            this.api.setJwt(jwt.access_token);
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch((ex: any) => {
          reject(false);
        });
    });
  }

  async socialregister(
    provider: 'GoogleAuthProvider' | 'FacebookAuthProvider'
  ) {
    return await new Promise(async (resolve, reject) => {
      try {
        let _provider: any = null;
        if (provider === 'GoogleAuthProvider')
          _provider = new firebase.auth.GoogleAuthProvider();
        if (provider === 'FacebookAuthProvider')
          _provider = new firebase.auth.FacebookAuthProvider();
        const result: any = await this.auth.signInWithPopup(_provider);

        resolve({
          auth_type: provider === 'GoogleAuthProvider' ? 'google' : 'facebook',
          fullname: '',
          username: result.user.providerData[0]['displayName'],
          email: result.user.providerData[0]['email'],
          image: result.user.providerData[0]['photoURL'],
          uid: result.user.providerData[0]['uid'],
        });
      } catch (ex: any) {
        reject({
          error: ex.message || ex.error || ex,
        });
      }
    });
  }

  async register(body: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        const data: any = await this.api.post(`register`, body);
        if (data.message !== 'user registered' || data.error || !data)
          throw new Error(data.message || data.error || "Can't register user");

        resolve('register');
      } catch (ex: any) {
        this.globals.spinner.hide();
        this.toastr.error(ex, 'Registeration Error!');
        reject({
          error: ex.message || ex.error || ex,
        });
      }
    });
  }

  public async login(form: any, type: string = 'email') {
    return await new Promise(async (resolve, reject) => {
      this.globals.spinner.show();
      try {
        let url: string = type == 'email' ? `login` : `socialauth`;
        /// send post request to login endpoint
        const login: any = await this.api.post(url, form);
        if (login.error) throw new Error(login.error || login);

        this.globals.storage.saveItem('jwt', login);

        const jwt = await this.globals.storage.getItem('jwt');
        this.api.setJwt(jwt.access_token);

        await this.getUserInfo();

        this.globals.spinner.hide();
        resolve('logged in');
      } catch (ex: any) {
        this.globals.spinner.hide();
        reject({ error: ex.error || ex.message || ex });
      }
    });
  }

  async getUserInfo() {
    return await new Promise(async (resolve, reject) => {
      try {
        const user: any = await this.api.get(`user`);
        if (user.error) throw new Error(user.error || user);

        this.user = user[0];
        this.globals.storage.saveItem('user', user[0]);
        resolve(user[0]);
      } catch (ex: any) {
        console.log(ex);
        reject({ error: ex.error || ex.message || ex });
      }
    });
  }

  async getUserActivities() {
    return await new Promise(async (resolve, reject) => {
      try {
        this.globals.spinner.show();
        const resp: any = await this.api.get(`activities`);
        // console.log(resp)
        if (resp.error) throw new Error(resp.error || resp);

        this.globals.spinner.hide();
        this.activities = resp.message;
        resolve(resp.message);
      } catch (ex: any) {
        console.log(ex);
        this.globals.spinner.hide();
        reject({ error: ex.error || ex.message || ex });
      }
    });
  }

  async updateUserInfo(form: any) {
    return await new Promise(async (resolve, reject) => {
      this.globals.spinner.show();
      try {
        const resp: any = await this.api.update(`user`, form);
        if (resp.error) throw new Error(resp.error || resp);

        this.globals.spinner.hide();
        resolve(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        reject({ error: ex.error || ex.message || ex });
      }
    });
  }

  async uploadProfile(file: any) {
    return await new Promise(async (resolve, reject) => {
      this.globals.spinner.show();
      try {
        const myFormData = new FormData();
        myFormData.append('file', file);
        myFormData.append(
          'upload_preset',
          environment.cloudinary.upload_preset
        );
        myFormData.append('skipAuthorization', 'true');

        const resp: any = await this.api.upload(`/faicorn/users`, myFormData);
        if (resp.error) throw new Error(resp.error || resp);

        this.globals.spinner.hide();
        console.log(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        reject({ error: ex.error || ex.message || ex });
      }
    });
  }

  async deleteUser() {
    return await new Promise(async (resolve, reject) => {
      try {
        const resp: any = await this.api.delete(`/remove`);
        if (resp.error) throw new Error(resp.error || resp);

        resolve(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        reject({ error: ex.error || ex.message || ex });
      }
    });
  }

  async logout() {
    await this.auth.signOut();
    await this.globals.storage.clear();
    this.user = undefined;
    this.api.setJwt(null);
    this.globals.router.navigate(['/accounts/login']);
  }
}
