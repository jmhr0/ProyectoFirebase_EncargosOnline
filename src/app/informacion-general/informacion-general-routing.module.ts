import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionGeneralPage } from './informacion-general.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionGeneralPage
  },
  {
    path: 'home',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionGeneralPageRoutingModule {}