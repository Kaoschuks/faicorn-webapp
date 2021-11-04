import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { AppIndexComponent } from './app-index/app-index.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsComponent } from './forms/forms.component';


@NgModule({
  declarations: [
    AppIndexComponent, FormsComponent
  ],
  imports: [
    CommonModule, ComponentsModule,
    AppsRoutingModule
  ]
})
export class AppsModule { }
