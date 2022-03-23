import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { IndexPagesComponent } from './index-pages/index-pages.component';
import { ListingPagesComponent } from './listing-pages/listing-pages.component';
import { DetailPagesComponent } from './detail-pages/detail-pages.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ComingComponent } from './coming/coming.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


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
    WebsiteRoutingModule, NgxSkeletonLoaderModule,
    ReactiveFormsModule
  ]
})
export class WebsiteModule { }
