import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsLayoutComponent } from 'src/app/components/layout/accounts-layout/accounts-layout.component';
import { AuthGuardsService} from 'src/app/guards/app.guard';
import { ProfileGuardsService } from 'src/app/guards/profile.guard';
import { AccountsComponent } from '../accounts/accounts.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: 'forgot', component: AuthComponent },
  { 
    path: '', 
    component: AccountsLayoutComponent,
    children: [
      {
        path: 'overview',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'profile',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'orders',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'activities',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'listings',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'listings/add',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'listings/edit/:ads_id',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'messages',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'messages/:msgid',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'security',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'payments',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      },
      {
        path: 'settings',
        canActivate: [AuthGuardsService, ProfileGuardsService],
        component: AccountsComponent
      }
    ]
  },
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
export class AuthRoutingModule { }
