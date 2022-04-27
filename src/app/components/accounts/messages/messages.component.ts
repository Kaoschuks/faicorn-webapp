import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { MessagingService } from 'src/app/services/features/messaging/messaging.service';

@Component({
  selector: 'accounts-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(
    public _globals: GlobalsService,
    public messagingService: MessagingService
  ) {}

  ngOnInit() {
    this._globals.spinner.show();
    this.getMessages();
  }

  async getMessages() {
    const resp = await this.messagingService.getChannels();
    console.log(resp);
    this._globals.spinner.hide();
  }
}
