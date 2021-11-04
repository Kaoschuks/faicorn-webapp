import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StorageServices {
  secret: string = environment.secretKey;
  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService) { }
  encrypt(data: any, key: any): any {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  }

  decrypt(data: any, key: any): any{
    let bytes = CryptoJS.AES.decrypt(data, key);
    if(bytes.toString(CryptoJS.enc.Utf8) != '') {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
  }

  saveItem = (key: string, data: {}) => {
    return this.storage.set(
      key,
      this.encrypt(data, this.secret)
    );
  }

  getItem = async (key: string): Promise<any> => {
    return await new Promise((resolve, reject) => {
      var encryptedRes = this.storage.get(key);

      if (encryptedRes != null) {
        resolve(this.decrypt(encryptedRes, this.secret));
      } else {
        resolve(encryptedRes);
      }

    });
  }

  removeItem = (key: string) => {
    return this.storage.remove(this.encrypt(key, this.secret));
  }

  clear = () => {
    return this.storage.clear();
  }
}

