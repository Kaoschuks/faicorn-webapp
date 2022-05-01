import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { MessagingService } from 'src/app/services/features/messaging/messaging.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'accounts-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Array<any> = [];
  public mobileView: boolean = false;

  constructor(
    public _globals: GlobalsService,
    public messagingService: MessagingService,
    private breakpointObserver: BreakpointObserver
  ) {
    // detect screen size changes
    this.breakpointObserver
      .observe(['(max-width: 480px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }
      });
  }

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
