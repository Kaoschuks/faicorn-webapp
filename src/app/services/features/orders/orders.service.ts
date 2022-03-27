import { Injectable } from '@angular/core';
import { GlobalsService } from '../../core/globals.service';
import { RequestService } from '../../core/request-service';
import { UsersService } from '../users';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orderInfo: any
  orders: Array<any> = []
  paystackInfo: any = {
    amount: 1000,
    email: 'demo@gmail.com',
    currency: 'NGN',
    channel: ['bank'],
    ref: ''
  }

  constructor(
      private api: RequestService,
      private globals: GlobalsService,
      private userService: UsersService
  ) {
  }

  async getOrders() {
    return await new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.get('orders?limits=100')
        if(resp.error) throw new Error(resp.error);

        this.orders = resp.message
        resolve(resp.message)
      }catch(ex: any) {

        reject({
          error: ex.message || ex.error || ex || 'Error in retrieving orders'
        })
      }
    })
  }

  async createOrders(data: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.api.post('orders', data);
        if(resp.error) throw new Error(resp.error);

        resolve(resp)
      }catch(ex: any) {

        reject({
          error: ex.message || ex.error || ex || 'Error in creating orders'
        })
      }
    })
  }

  async paymentInit(data: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      try {
        const resp: any = await this.globals.storage.getItem('user');
        this.paystackInfo.email = resp.email;
      }catch(ex: any) {
        reject({
          error: ex.message || ex.error || ex
        })
      }
    })
  } 

  async paymentCancel(data: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      try {
        console.log('Payment cancelled', data);
      }catch(ex: any) {

        reject({
          error: ex.message || ex.error || ex
        })
      }
    })
  }

  async saveTransaction(data: any, name: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      try {
        // create order information
        const order_resp: any = await this.createOrders({
          "summary": "Order Made for " + name,
          "total_amount": this.paystackInfo.amount,
          "order_type": "one-time",
          "payment_gateway": "paystack",
          "amount_paid": this.paystackInfo.amount
        })
        const trans_resp: any = await this.api.post('transactions', {
          "orderid": order_resp.orderid,
          "transid": data.reference,
          "summary": "Transaction for "+ name,
          "amount": this.paystackInfo.amount,
          "status": data.status,
          "uid": "",
          "transaction_info": JSON.stringify({'source': 'paystack'})
        })
        if(trans_resp.error) throw new Error(trans_resp.error);

        resolve(trans_resp)
      }catch(ex: any) {

        reject({
          error: ex.message || ex.error || ex || 'Error in saving orders'
        })
      }
    })
  }
}
