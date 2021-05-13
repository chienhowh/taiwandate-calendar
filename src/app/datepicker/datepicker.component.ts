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


  /** 今天日期 for moment 運算 */
  today = moment();

  /** 日 */
  days = [];

  /** header date: 預設今天 */
  headerDate: Date = new Date();
  headerDay: number;

  /** 最後顯示日期 */
  selected_date = this.headerDate;

  // 中文週
  weekZh = ['日', 'ㄧ', '二', '三', '四', '五', '六'];


  constructor(
  ) { }

  ngOnInit(): void {
    console.log(this.today);

  }


  // header start
  prevYear() {
    this.today.subtract(1, 'y');
    this.headerDate = this.headerShow(this.today.valueOf());
    this.calendarShow();

  }

  prevMth() {
    this.today.subtract(1, 'M');
    this.headerDate = this.headerShow(this.today.valueOf());
    this.calendarShow();

  }
  nextYear() {
    this.today.add(1, 'y');
    this.headerDate = this.headerShow(this.today.valueOf());
    this.calendarShow();

  }

  nextMth() {
    this.today.add(1, 'M');
    this.headerDate = this.headerShow(this.today.valueOf());
    this.calendarShow();

  }

  /**translate to header date*/
  headerShow(timestamp: number) {
    return new Date(timestamp);
  }
  // header end



  toggleCalendar() {
    this.dates.nativeElement.classList.toggle('active');// 顯示日歷
    this.headerDay = this.today.date();
    console.log(this.today);

    console.log(this.headerDay);

    this.calendarShow();

  }

  /** 月曆日期 */
  calendarShow() {
    const startDay = this.today.clone().startOf('month').day();

    const days = this.today.daysInMonth(); // 當月天數
    // days length 固定42
    this.days = [];
    // 加入前一個月的底
    for (let i = 0; i < startDay; i++) {
      this.days.push(i + 1);
    }
    // 當月日期
    for (let i = 0; i < days; i++) {
      this.days.push(i + 1);
    }
    // 加入後一個月的頭
    const lengthLeft = this.days.length;
    for (let i = 0; i < 42 - lengthLeft; i++) {
      this.days.push(i + 1)
    }

  }

  selectDate(event) {
    const date = +event.target.innerHTML;
    this.headerDay = date;
  }

}
