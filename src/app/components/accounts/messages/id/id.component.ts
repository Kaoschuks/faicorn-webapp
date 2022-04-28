import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals.service';
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
    msg_type: new FormControl('', Validators.compose([Validators.required])),
  });
  files: any[] = [];

  constructor(
    private _globals: GlobalsService,
    public messagingServices: MessagingService
  ) {}

  ngOnInit() {
    this._globals.spinner.show();
  }

  async postMessage(form: any) {
    if (!this.messageForm.valid || this.messageForm.errors) return;
    let formData: any = form;
    formData.files = this.files;
    const resp = await this.messagingServices.postMessages(formData);
    // console.log(resp)
    this._globals.spinner.hide();
  }

  async OnSubmit() {
    if (!this.messageForm.valid) return;
    console.log(this.messageForm.value);
  }
}
