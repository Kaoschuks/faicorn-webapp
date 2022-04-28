import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from '../../core/globals.service';
import { RequestService } from '../../core/request-service';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  messageInfo: any;
  messages: Array<any> = [];

  constructor(
    private globals: GlobalsService,
    private api: RequestService,
    private toastr: ToastrService
  ) {}

  async postMessages(data: any) {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.post('message', data);
        if (resp.error) throw new Error(resp.error);
        resolve(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        reject({
          error: ex.error || ex.message || ex || 'Error posting message',
        });
      }
    });
  }

  async deleteMessage(id: string = '') {
    return await new Promise(async (resolve, reject) => {
      try {
        const resp: any = await this.api.delete(`message/${id}`);
        if (resp.error) throw new Error(resp.error || resp);

        resolve(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        reject({
          error: ex.error || ex.message || ex || 'Error deleting message',
        });
      }
    });
  }

  async getChannels() {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.get('channels');
        if (resp.error) throw new Error(resp.error);
        resolve(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        reject({
          error: ex.error || ex.message || ex || 'Error getting channels',
        });
      }
    });
  }

  async postChannels(data: any) {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.post('channels', data);
        resolve(resp);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        reject({
          error: ex.error || ex.message || ex || 'Error posting channels',
        });
      }
    });
  }

  async getChannel(id: string = '') {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.get(`channels/${id}`);
        if (resp.error) throw new Error(resp.error);
        resolve(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        reject({
          error: ex.error || ex.message || ex || 'Error getting channel: ' + id,
        });
      }
    });
  }

  async deleteChannel(id: string = '') {
    return await new Promise(async (resolve, reject) => {
      try {
        const resp: any = await this.api.delete(`channels/${id}`);
        if (resp.error) throw new Error(resp.error || resp);

        resolve(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        this.toastr.error(ex, 'Error Deleting Channel!');
        console.log(ex);
        reject({
          error: ex.error || ex.message || ex || 'Error deleting channel',
        });
      }
    });
  }
}
