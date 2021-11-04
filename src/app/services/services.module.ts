import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteReuseStrategy } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalsService } from './core/globals.service';
import { RequestService } from './core/request-service';
import { StorageServices } from './core/storage-services.service';


export const providers: Array<any> = [
  NgxSpinnerService,
  GlobalsService, RequestService, StorageServices,
  { provide: RouteReuseStrategy }
]

@NgModule({
	imports: [
    CommonModule
	],
  providers: providers
})
export class ServicesModule { }
