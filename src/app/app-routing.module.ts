import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home-page/home.component'; 

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'messages', loadChildren: () => import('./message/message.module').then(m => m.MessageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
