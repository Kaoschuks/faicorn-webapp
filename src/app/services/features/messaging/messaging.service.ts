import { Injectable } from '@angular/core';
import { GlobalsService } from '../../core/globals.service';
import { RequestService } from '../../core/request-service';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  messageInfo: any;
  messages: Array<any> = [];

  constructor(private globals: GlobalsService, private api: RequestService) {}

  postMessages(data: any) {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.post('/message', data);
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
        const resp: any = await this.api.delete(`/message/${id}`);
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

  getChannels() {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.get('/channels');
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

  postChannels(data: any) {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.post('/channels', data);
        if (resp.error) throw new Error(resp.error);
        resolve(resp.message);
      } catch (ex: any) {
        this.globals.spinner.hide();
        console.log(ex);
        reject({
          error: ex.error || ex.message || ex || 'Error posting channels',
        });
      }
    });
  }

  getChannel(id: string = '') {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.get(`/channels/${id}`);
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
}
