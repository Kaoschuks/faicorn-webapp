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
    currency: 'GHS',
    channel: ['bank'],
    ref: ''
  }

  constructor(
      private api: RequestService,
      private globals: GlobalsService
  ) {
  }

  async getOrders(data: any) {
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
        let trx = {
          summary: 'Payment of Featured Ad ' + name,
          total_amount: this.paystackInfo?.amount,
          order_type: "one-time",
          payment_gateway: 'paystack'
        }
        console.log(trx)

        // const resp: any = await this.api.post('transactions', trx)
        // if(resp.error) throw new Error(resp.error);
        // resolve(resp.message);
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
