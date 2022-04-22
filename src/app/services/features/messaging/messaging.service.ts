import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  messageInfo: any;
  messages: Array<any> = [];

  constructor() {}
}
