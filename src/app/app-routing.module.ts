
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexLayoutComponent } from './components/layout/index-layout/index-layout.component';

const routes: Routes = [
  { 
    path: '', 
    component: IndexLayoutComponent,
    loadChildren: () => import('./pages/website/website.module').then( m => m.WebsiteModule) 
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabledBlocking' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
