import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';

import { GlobalsService } from './core/globals.service';
import { RequestService } from './core/request-service';
import { StorageServices } from './core/storage-services.service';
import { UsersService } from './features/users';
import { ListingsService } from './features/listings/listings.service';
import { MessagingService } from './features/messaging/messaging.service';
import { OrdersService } from './features/orders/orders.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


export const providers: Array<any> = [
  GlobalsService, RequestService, StorageServices,
  ListingsService, MessagingService, UsersService, OrdersService
]

@NgModule({
	imports: [
		CommonModule, NgxPaginationModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule,
	],
  providers: providers
})
export class ServicesModule { }
