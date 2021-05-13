import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import flatpickr from 'flatpickr';
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit, AfterViewInit {
  @ViewChild('time') time: ElementRef;
  date = null;
  isEnglish = false;
  title = 'appBootstrap';

  model;
  selectdate;

  elem = document.getElementById('test');
  // datepicker = flatpickr(this.elem, {
  //   // options here
  // });
  constructor(private i18n: NzI18nService) { }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }

  ngOnInit() {


  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.elem);
    console.log(this.time);
  }
}
function getISOWeek(result: Date): any {
  throw new Error('Function not implemented.');
}


