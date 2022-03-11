import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { IndexPagesComponent } from './index-pages/index-pages.component';
import { ListingPagesComponent } from './listing-pages/listing-pages.component';
import { DetailPagesComponent } from './detail-pages/detail-pages.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ComingComponent } from './coming/coming.component';
import { FilterComponent } from 'src/app/components/ui/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexPagesComponent,
    ListingPagesComponent,
    DetailPagesComponent,
    ComingComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    WebsiteRoutingModule,
    ReactiveFormsModule
  ]
})
export class WebsiteModule { }
