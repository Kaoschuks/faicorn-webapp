import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { MessagingService } from 'src/app/services/features/messaging/messaging.service';

@Component({
  selector: 'messages-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.css'],
})
export class MessagesIdComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef | any;
  messageForm: FormGroup = new FormGroup({
    channel_id: new FormControl('', Validators.compose([Validators.required])),
    messages: new FormControl('', Validators.compose([Validators.required])),
    msg_type: new FormControl(''),
  });
  loggedInUser: any;
  messages: any[] = [];
  receipient: any;

  constructor(
    private _globals: GlobalsService,
    public messagingServices: MessagingService
  ) {}

  async ngOnInit() {
    await this.getMessages();
    let channel_id = decodeURIComponent(this._globals.url.split('/')[3]);
    this.messageForm.patchValue({ channel_id });
    this.scrollToBottom();
  }

  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }

  async OnSubmit(form: any) {
    if (!this.messageForm.valid) return;
    let formData: any = form;
    formData.files = [];
    formData.msg_type = 'text';
    const resp: any = await this.messagingServices.postMessages(formData);
    this.messageForm.reset();
    await this.getMessages();
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
    this.loggedInUser = await this._globals.storage.getItem('user');
    this.receipient = resp[0]?.users.filter(
      (i: any) => i.uid !== this.loggedInUser?.uid
    )[0];
    this._globals.spinner.hide();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scroll({
        top: this.myScrollContainer.nativeElement.scrollHeight,

        left: 0,

        behavior: 'smooth',
      });
    } catch (err) {}
  }
}
