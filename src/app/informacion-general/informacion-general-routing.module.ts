import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionGeneralPage } from './informacion-general.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionGeneralPage
  },
  {
    path: 'informacion-general',
    redirectTo: '/informacion-general'
  },
  {
    path: 'home',
    redirectTo: '/home'
  },
  {
    path: 'quienes-somos',
    redirectTo: '/quienes-somos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionGeneralPageRoutingModule {}