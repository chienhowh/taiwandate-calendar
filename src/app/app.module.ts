import { TaiwanDatePipe } from './taiwan-date.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_TW } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import 'flatpickr/dist/flatpickr.css';
import { DatepickerComponent } from './datepicker/datepicker.component';
registerLocaleData(zh);
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BetweenDateComponent } from './between-date/between-date.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    TaiwanDatePipe,
    BetweenDateComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NzDatePickerModule,
    NgbModule,
    NzIconModule,
    NzInputModule
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_TW }],
  bootstrap: [AppComponent]
})
export class AppModule { }
