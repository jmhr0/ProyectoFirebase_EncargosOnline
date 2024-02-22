import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionGeneralPageRoutingModule } from './informacion-general-routing.module';

import { InformacionGeneralPage } from './informacion-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionGeneralPageRoutingModule
  ],
  declarations: [InformacionGeneralPage]
})
export class InformacionGeneralPageModule {}
