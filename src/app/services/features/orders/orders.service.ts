import { Injectable } from '@angular/core';
import { GlobalsService } from '../../core/globals.service';
import { RequestService } from '../../core/request-service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orderInfo: any
  orders: Array<any> = []
  paystackInfo: any = {
    amount: 1000,
    email: 'jasonaddy51@gmail.com',
    currency: 'GHS',
    channel: ['bank'],
    ref: ''
  }

  constructor(
      private api: RequestService,
      private globals: GlobalsService
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

        resolve(resp.message)
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
        console.log('Payment initialized');
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
        // save transaction information
        const trans_resp: any = await this.api.post('transactions', {
          "orderid": order_resp.orderid,
          "transid": data.ref,
          "summary": "Transaction for "+ name,
          "amount": data.amount,
          "status": data.status,
          "uid": "",
          "transaction_info": JSON.stringify({'source': 'paystack'})
        })
        console.log('Created Order: ' + order_resp)
        console.log('Saved Transaction: ' + trans_resp.message)
      }catch(ex: any) {

        reject({
          error: ex.message || ex.error || ex
        })
      }
    })
  }
}


// let trx = {
//   orderid: '',
//   transid: data?.transaction,
//   summary: '',
//   amount: this.paystackInfo.amount,
//   status: data?.status,
//   uid: '',
//   transaction_info: {'source': 'paystack'},
// }
// console.log(trx)
