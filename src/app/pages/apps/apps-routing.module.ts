import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppIndexComponent } from './app-index/app-index.component';
import { FormsComponent } from './forms/forms.component';

const routes: Routes = [
  { path: 'overview', component: AppIndexComponent },
  { path: 'users', component: AppIndexComponent },
  { path: 'users/add', component: FormsComponent },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
