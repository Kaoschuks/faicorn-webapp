import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexLayoutComponent } from './components/layout/index-layout/index-layout.component';
import { ListingsLayoutComponent } from './components/layout/listings-layout/listings-layout.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexLayoutComponent,
    loadChildren: () => import('./pages/website/website.module').then( m => m.WebsiteModule) 
  },
  { 
    path: 'auth', 
    // component: IndexLayoutComponent,
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule) 
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
