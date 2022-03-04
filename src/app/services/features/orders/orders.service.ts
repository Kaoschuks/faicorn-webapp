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

  async saveTransaction(data: any) {
    return await new Promise(async (resolve: any, reject: any) => {
      try {
        console.log(data);
      }catch(ex: any) {

        reject({
          error: ex.message || ex.error || ex
        })
      }
    })
  }
}
