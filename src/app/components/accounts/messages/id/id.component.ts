import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals.service';

@Component({
  selector: 'messages-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.css'],
})
export class MessagesIdComponent implements OnInit {
  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.compose([Validators.required])),
  });

  constructor(private _globals: GlobalsService) {}

  ngOnInit() {
    this._globals.spinner.show();
    this.getMessages();
  }

  async getMessages() {
    // const resp = await this.ordersService.getOrders();
    // console.log(resp)
    this._globals.spinner.hide();
  }

  async OnSubmit() {
    if (!this.messageForm.valid) return;
    console.log(this.messageForm.value);
  }
}
