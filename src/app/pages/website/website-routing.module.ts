import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsLayoutComponent } from 'src/app/components/layout/listings-layout/listings-layout.component';
import { ComingComponent } from './coming/coming.component';
import { DetailPagesComponent } from './detail-pages/detail-pages.component';
import { IndexPagesComponent } from './index-pages/index-pages.component';
import { ListingPagesComponent } from './listing-pages/listing-pages.component';

const routes: Routes = [
  // { path: '', component: IndexPagesComponent },
  // { path: 'contact', component: IndexPagesComponent },
  // { path: 'terms-conditions', component: IndexPagesComponent },
  { path: 'coming', component: ComingComponent },
  // { path: 'privacy-policy', component: IndexPagesComponent },
  // { 
  //   path: ':categories', 
  //   component: ListingsLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: ListingPagesComponent
  //     },
  //     {
  //       path: ':subscategories',
  //       component: ListingPagesComponent
  //     },
  //     {
  //       path: ':subscategories/:type',
  //       component: ListingPagesComponent
  //     },
  //   ]
  // },
  // { path: ':categories/:subscategories/:type/:id', component: DetailPagesComponent },
  {
    path: '',
    redirectTo: 'coming',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
