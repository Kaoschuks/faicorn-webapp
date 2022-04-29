import { Component, OnInit } from '@angular/core';
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
    msg_type: new FormControl('', Validators.compose([Validators.required])),
  });
  files: Array<any> = [];

  constructor(
    private _globals: GlobalsService,
    public messagingServices: MessagingService,
    private _listingservices: ListingsService
  ) {}

  ngOnInit() {
    let channel_id = this._globals.url.split('/')[3];
    this.messageForm.patchValue({ channel_id });
  }

  async OnSubmit(form: any) {
    if (!this.messageForm.valid || this.messageForm.errors) return;
    let formData: any = form;
    formData.files = this.files;
    const resp = await this.messagingServices.postMessages(formData);
    // console.log(resp)
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

  onFile(event: any) {
    event.preventDefault();
    if (event.target.files.length > 5)
      alert('You can`t choose more than 5 files');
    if (event.target.files.length <= 5) {
      this._globals.spinner.show();
      let promise = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        promise[i] = new Promise(async (resolve, reject) => {
          const file_resp: any = await this._listingservices.upload(file);
          if (file_resp.secure_url)
            resolve(
              file_resp.secure_url.replace(
                'image/upload/',
                'image/upload/w_auto,f_auto,q_auto/'
              )
            );
          if (file_resp.secure_url) reject(file_resp);
        });
      }
      Promise.all(promise)
        .then((values) => {
          this._globals.spinner.hide();
          this.files = values;
        })
        .catch((err: any) => {
          this._globals.spinner.hide();
          console.error(err);
        });
    }
    return false;
  }
}
