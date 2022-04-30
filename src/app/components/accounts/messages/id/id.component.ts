import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import { MessagingService } from 'src/app/services/features/messaging/messaging.service';

@Component({
  selector: 'messages-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.css'],
})
export class MessagesIdComponent implements OnInit {
  messageForm: FormGroup = new FormGroup({
    channel_id: new FormControl('', Validators.compose([Validators.required])),
    messages: new FormControl('', Validators.compose([Validators.required])),
    msg_type: new FormControl(''),
  });
  messages: any[] = [];
  receipient: any;

  constructor(
    private _globals: GlobalsService,
    public messagingServices: MessagingService,
    private _listingservices: ListingsService
  ) {}

  async ngOnInit() {
    await this.getMessages();
    let channel_id = this._globals.url.split('/')[3];
    this.messageForm.patchValue({ channel_id });
  }

  async OnSubmit(form: any) {
    if (!this.messageForm.valid) return;
    let formData: any = form;
    formData.files = [];
    formData.msg_type = 'text';
    console.log(formData);
    const resp = await this.messagingServices.postMessages(formData);
    console.log(resp);
    this._globals.spinner.hide();
  }

  async deleteMessage(message_id: string) {
    this._globals.spinner.show();
    let channel_id = this._globals.url.split('/')[3];
    let data = {
      channel_id,
      message_id,
    };
    const resp = await this.messagingServices.deleteMessage(data);
    // console.log(resp)
    this._globals.spinner.hide();
  }

  async getMessages() {
    this._globals.spinner.show();
    let channel_id = this._globals.url.split('/')[3];
    const resp: any = await this.messagingServices.getChannel(channel_id);
    this.messages = resp[0]?.messages;
    var user = await this._globals.storage.getItem('user');
    this.receipient = resp[0]?.users.filter((i: any) => i.uid !== user?.uid)[0];
    this._globals.spinner.hide();
  }
}
