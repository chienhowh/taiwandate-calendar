import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  /** template 顯示都用timestamp 操作*/
  @ViewChild('dates') dates: ElementRef;
  @Input() taiwanDate = true;
  @Input() numberOnly = true;


  /** 今天日期 for moment 運算 */
  today = moment();

  /** 日 */
  days = [];

  /** header date: 預設今天 */
  headerDate = new Date().valueOf();
  // 提示今天選中日期(小圈圈)
  calendarDay;

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
    this.today.subtract(1, 'y');// format才能操作
    this.headerDate = this.today.valueOf();
    this.calendarShow();

  }

  prevMth() {
    this.today.subtract(1, 'M');
    this.headerDate = this.today.valueOf();
    this.calendarShow();

  }
  nextYear() {
    this.today.add(1, 'y');
    this.headerDate = this.today.valueOf();
    this.calendarShow();

  }

  nextMth() {
    this.today.add(1, 'M');
    this.headerDate = this.today.valueOf();
    this.calendarShow();

  }
  // header end



  toggleCalendar() {
    this.dates.nativeElement.classList.toggle('active');// 顯示日歷
    this.calendarDay = this.today.clone().add(0, 'd');
    console.log(this.today);
    console.log(this.calendarDay);
    this.calendarShow();

  }

  /** 月曆日期 */
  calendarShow() {
    const startDay = this.today.clone().startOf('month'); // 當月起始日期
    const endDay = this.today.clone().endOf('month');// 當月終止日期
    const days = this.today.daysInMonth(); // 當月天數
    // days length 固定42
    this.days = [];
    // 加入前一個月的底，startDay.day()===當月第一天是星期幾
    for (let i = 0; i < startDay.day(); i++) {
      const date = startDay.clone().subtract(startDay.day() - i, 'd').valueOf();
      this.days.push(date);
    }
    // 當月日期
    for (let i = 0; i < days; i++) {
      const date = startDay.clone().add(i, 'd').valueOf();
      this.days.push(date);
    }
    // 加入後一個月的頭
    const lengthLeft = this.days.length;
    for (let i = 0; i < 42 - lengthLeft; i++) {
      const date = endDay.clone().add(i + 1, 'd').valueOf();
      this.days.push(date);
    }
    console.log(this.days);

  }

  /**
   * 是否在當月的日期，不是的話給他灰色字體
   * @param timestamp
   */
  presentMth(timestamp: number) {
    const todayMth = this.today.month();
    const mth = moment(timestamp).month();
    return mth === todayMth ? true : false;
  }

  /**
   *
   */
  selectDate(timestamp: number) {
    this.selected_date = timestamp;
    this.today = moment(timestamp);
    this.dates.nativeElement.classList.remove('active');
  }


  selectToday() {
    const timestamp = new Date().valueOf()
    this.selectDate(timestamp);
  }
}
