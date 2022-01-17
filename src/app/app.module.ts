import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

import { ComponentsModule } from './components/components.module';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ServicesModule } from './services/services.module';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule, CommonModule, HttpClientModule,
    NgxSpinnerModule, AppRoutingModule,
		NgxSpinnerModule,
    ComponentsModule, ServicesModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
