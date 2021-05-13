import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @ViewChild('date_picker') date_picker: ElementRef;
  @ViewChild('dates') dates: ElementRef;
  // 今天日期 for moment 運算
  today = moment();

  // header date: 預設今天
  headerDate: Date = new Date();

  timer;
  // 顯示日期
  selected_date = this.headerDate;

  // 中文週
  weekZh = ['日', 'ㄧ', '二', '三', '四', '五', '六'];
  constructor(
  ) { }

  ngOnInit(): void {
    console.log(this.today);

  }

  prevYear() {
    this.today = this.today.subtract(1, 'y');
    this.headerDate = this.headerShow(this.today.valueOf());

  }

  prevMth() {
    this.today = this.today.subtract(1, 'M');
    this.headerDate = this.headerShow(this.today.valueOf());

  }
  nextYear() {
    this.today = this.today.add(1, 'y');
    this.headerDate = this.headerShow(this.today.valueOf());

  }

  nextMth() {
    this.today = this.today.add(1, 'M');
    this.headerDate = this.headerShow(this.today.valueOf());

  }



  toggleCalendar() {
    this.dates.nativeElement.classList.toggle('active');
  }

  // translate to header date
  headerShow(timestamp: number) {
    return new Date(timestamp);
  }
}
