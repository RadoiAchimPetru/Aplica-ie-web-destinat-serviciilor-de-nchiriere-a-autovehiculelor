import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './auth/components/login/login.component'
import { SignupComponent } from './auth/components/signup/signup.component'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgZorroImportsModule } from './NgZorroImportsModule'
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../environment';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { CustomerModule } from './modules/customer/customer.module'
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US }  from 'ng-zorro-antd/i18n';
import { LOCALE_ID }       from '@angular/core';
import { MapPickerComponent } from './components/map-picker/map-picker.component';
import { GoogleMapsModule } from '@angular/google-maps';


registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, PaymentDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzMessageModule,
    BrowserAnimationsModule,
    NgZorroImportsModule,
    NgxStripeModule.forRoot(environment.stripePublishableKey),
    CustomerModule,
    GoogleMapsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: LOCALE_ID, useValue: 'en-US' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
