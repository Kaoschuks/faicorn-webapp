import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AccountsComponent } from './pages/accounts/accounts.component';

import { ServicesModule } from './services/services.module';
import { ComponentsModule } from './components/components.module';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent, AccountsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule, CommonModule, HttpClientModule,
    NgxSpinnerModule, AppRoutingModule,
		NgxSpinnerModule,
    ComponentsModule, ServicesModule, ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
