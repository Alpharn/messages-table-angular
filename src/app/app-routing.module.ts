import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home-page/home.component'; 

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'messages', loadChildren: () => import('./components/messages-page/lazy-loading.module').then(m => m.LazyLoadingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
