  import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
  import { CommonModule } from '@angular/common'

  import { CustomerRoutingModule } from './customer-routing.module'
  import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component'
  import { NgZorroImportsModule } from '../../NgZorroImportsModule'
  import { BookCarComponent } from './components/book-car/book-car.component'
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { MyBookingsComponent } from './components/my-bookings/my-bookings.component'
  import { PaymentCardComponent } from '../../payment-card/payment-card.component'
  import { NgxStripeModule } from 'ngx-stripe'
  import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
  import { NzModalModule }      from 'ng-zorro-antd/modal';
  import { NzButtonModule }     from 'ng-zorro-antd/button';
  import { NzFormModule }       from 'ng-zorro-antd/form';
  import { MapPickerComponent } from '../../components/map-picker/map-picker.component';
  import { ChatBotComponent } from './components/chat-bot/chat-bot.component'
  import { SearchCarComponent } from './components/search-car/search-car.component'
  import { RouterModule } from '@angular/router';
  import { NzRadioModule } from 'ng-zorro-antd/radio';
import { DateDiffPipe } from '../../shared/date-diff.pipe';
  



  @NgModule({
    declarations: [CustomerDashboardComponent, BookCarComponent, MyBookingsComponent,PaymentCardComponent,MapPickerComponent, ChatBotComponent,SearchCarComponent,DateDiffPipe],
    imports: [
      CommonModule,
      CustomerRoutingModule,
      NgZorroImportsModule,
      ReactiveFormsModule,
      NzButtonModule,
      NgxStripeModule.forRoot(
        'pk_test_51RdXqZPrcYGB9eI4qXHgK6VreVPWEcm6SJjoRi4lXsmRDlVjy4a0FnALXM8cnrKlXi2pdsbJj1duiVkXVamt6KzI00WOUsl3yW',
        { loadScript: true } as any),
      NzFormModule,
      NgZorroImportsModule,
      NzModalModule,
      FormsModule,
      NzRadioModule,
      RouterModule
      
      
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [                
  MapPickerComponent,PaymentCardComponent
  ]
  })
  export class CustomerModule {}
