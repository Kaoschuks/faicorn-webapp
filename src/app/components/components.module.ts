import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';

import { HeaderLayoutComponent } from './layout/header-layout/header-layout.component';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { FooterLayoutComponent } from './layout/footer-layout/footer-layout.component';

import { LoadingComponent } from './ui/loading/loading.component';
import { DatatablesComponent } from './ui/datatables/datatables.component';

import { ErrorComponent } from './ui/error/error.component';
import { NoContentComponent } from './ui/no-content/no-content.component';

import { LoginFormComponent } from './forms/login-form/login-form.component';

export const component: Array<any> = [
	HeaderLayoutComponent, SidebarLayoutComponent, FooterLayoutComponent,
	LoadingComponent, DatatablesComponent, NoContentComponent,
	ErrorComponent,
	LoginFormComponent,
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
