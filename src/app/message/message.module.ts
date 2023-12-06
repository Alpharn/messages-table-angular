import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MessagesPageComponent } from './components/messages-page/messages-page.component';

const routes: Routes = [
  { path: '', component: MessagesPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class MessageModule {}