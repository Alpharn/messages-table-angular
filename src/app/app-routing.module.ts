import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home-page/home.component'; 
import { AppRoute } from "src/app/message/constants/routes";


const routes: Routes = [
  { path: AppRoute.Home, component: HomeComponent }, 
  { path: AppRoute.Messages, loadChildren: () => import('./message/message.module').then(m => m.MessageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
