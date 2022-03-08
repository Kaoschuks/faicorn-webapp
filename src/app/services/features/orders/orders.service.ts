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
    amount: 100,
    email: 'jasonaddy51@gmail.com',
    currency: 'NGN',
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
        
      }catch(ex: any) {

        reject({
          error: ex.message || ex.error || ex
        })
      }
    })
  }

  async createOrders(data: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      try {
        
      }catch(ex: any) {

        reject({
          error: ex.message || ex.error || ex
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
        console.log(data);
        // create order information
        const order_resp: any = await this.createOrders({
          "summary": "",
          "total_amount": data.amount,
          "order_type": "one-time",
          "payment_gateway": "paystack"
        })
        // save transaction information
        const trans_resp: any = await this.api.post('transactions', {
          "orderid": order_resp.orderid,
          "transid": data.ref,
          "summary": "",
          "amount": data.amount,
          "status": data.status,
          "uid": "",
          "transaction_info": JSON.stringify({'source': 'paystack'})
        })
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
