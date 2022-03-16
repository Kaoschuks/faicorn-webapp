import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';


import { LoadingComponent } from './ui/loading/loading.component';
import { ErrorComponent } from './ui/error/error.component';
import { NoContentComponent } from './ui/no-content/no-content.component';

import { LoginFormComponent } from './forms/login-form/login-form.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { ForgotFormComponent } from './forms/forgot-form/forgot-form.component';
import { ChangepasswordFormComponent } from './forms/changepassword-form/changepassword-form.component';
import { ProfileFormComponent } from './forms/profile-form/profile-form.component';

import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';
import { ListingsLayoutComponent } from './layout/listings-layout/listings-layout.component';
import { AccountsLayoutComponent } from './layout/accounts-layout/accounts-layout.component';

import { NavbarComponent } from './ui/navbar/navbar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { BreadcrumbComponent } from './ui/breadcrumb/breadcrumb.component';
import { FilterComponent } from './ui/filter/filter.component';

import { AdsListsComponent } from './ads/ads-lists/ads-lists.component';
import { AdsGridComponent } from './ads/ads-grid/ads-grid.component';
import { AdsInfoComponent } from './ads/ads-info/ads-info.component';
import { AdsCategoryScrollComponent } from './ads/ads-category-scroll/ads-category-scroll.component';
import { ReviewListingComponent } from './ui/review-listing/review-listing.component';
import { AccountsSidebarComponent } from './ui/accounts-sidebar/accounts-sidebar.component';

import { PaymentsComponent } from './accounts/payments/payments.component';
import { SecurityComponent } from './accounts/security/security.component';
import { OverviewComponent } from './accounts/overview/overview.component';
import { ListingsComponent } from './accounts/listings/listings.component';
import { OrdersComponent } from './accounts/orders/orders.component';
import { ListingFormComponent } from './forms/listing-form/listing-form.component';
import { ListingsFilterPipe } from '../pipes/listingsFilter';
import { Angular4PaystackModule } from 'angular4-paystack';
import { environment } from 'src/environments/environment';
import { SearchPipe } from '../pipes/search';
import { ActivitiesComponent } from './accounts/activities/activities.component';

export const component: Array<any> = [
	SearchPipe,
	LoadingComponent,  NoContentComponent, NavbarComponent, FooterComponent, 
	BreadcrumbComponent, FilterComponent, ReviewListingComponent, AccountsSidebarComponent,
	ErrorComponent,
	LoginFormComponent, RegisterFormComponent, ForgotFormComponent, ChangepasswordFormComponent, ProfileFormComponent, ListingFormComponent,
	IndexLayoutComponent, ListingsLayoutComponent, AccountsLayoutComponent,
	AdsListsComponent, AdsGridComponent, AdsInfoComponent, AdsCategoryScrollComponent,
	PaymentsComponent, SecurityComponent, OverviewComponent, ListingsComponent, OrdersComponent, ActivitiesComponent, ListingsFilterPipe
]

@NgModule({
	declarations: component,
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule,
		RouterModule,
		NgxSpinnerModule,
		ReactiveFormsModule,
		Angular4PaystackModule.forRoot(environment.paystack.key),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	exports: component
})
export class ComponentsModule {}
