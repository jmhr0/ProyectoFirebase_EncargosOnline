import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuienesSomosPage } from './quienes-somos.page';

const routes: Routes = [
  {
    path: '',
    component: QuienesSomosPage
  },
  {
    path: 'informacion-general', // Redirige a la página de InformacionGeneralPage
    redirectTo: '/informacion-general'
  },
  {
    path: 'home', // Redirige a la página de inicio
    redirectTo: '/home'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuienesSomosPageRoutingModule {}
