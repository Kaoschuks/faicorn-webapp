import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';


import { LoadingComponent } from './ui/loading/loading.component';
import { ErrorComponent } from './ui/error/error.component';
import { NoContentComponent } from './ui/no-content/no-content.component';

import { LoginFormComponent } from './forms/login-form/login-form.component';
import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';
import { ListingsLayoutComponent } from './layout/listings-layout/listings-layout.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { FooterComponent } from './ui/footer/footer.component';

export const component: Array<any> = [
	LoadingComponent,  NoContentComponent, NavbarComponent, FooterComponent,
	ErrorComponent,
	LoginFormComponent,
	IndexLayoutComponent, ListingsLayoutComponent
]

@NgModule({
	declarations: component,
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		NgxSpinnerModule,
		ReactiveFormsModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	exports: component
})
export class ComponentsModule {}
