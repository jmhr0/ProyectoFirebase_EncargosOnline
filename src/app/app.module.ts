import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, AngularFireStorageModule],
  providers: [ImagePicker,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, CallNumber, SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
