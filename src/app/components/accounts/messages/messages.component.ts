import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { MessagingService } from 'src/app/services/features/messaging/messaging.service';

@Component({
  selector: 'accounts-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Array<any> = [];
  constructor(
    public _globals: GlobalsService,
    public messagingService: MessagingService
  ) {}

  async ngOnInit() {
    this._globals.spinner.show();
    await this.getMessages();
  }

  async getMessages() {
    const resp: any = await this.messagingService.getChannels();
    resp?.message ? (this.messages = []) : (this.messages = resp);
    this._globals.spinner.hide();
  }
}
