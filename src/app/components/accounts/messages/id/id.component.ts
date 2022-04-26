import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';

@Component({
  selector: 'messages-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.css'],
})
export class MessagesIdComponent implements OnInit {
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
}
