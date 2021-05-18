import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  /** template 顯示都用timestamp 操作 */
  /** 會拿到當天日期的起始時間 不是當下要注意 */
  @ViewChild('dates') dates: ElementRef;
  @Input() taiwanDate = true;
  @Input() numberOnly = true;


  /** 日曆顯示模式 eg 年份 月份 日期 */
  calendarMode = 'date';
  /** 今天日期 for moment 運算，不是最後選定日 */
  today = moment();

  /** 選擇時間與起始日差距 */
  diffTime = this.today.diff(this.today.clone().startOf('d'));

  /** 日 */
  days = [];
  /** 年 */
  years = [];

  /** header date: 預設今天 */
  headerDate = new Date().valueOf();

  /** 最後顯示日期 */
  selected_date = this.headerDate;

  // 中文週
  weekZh = ['日', 'ㄧ', '二', '三', '四', '五', '六'];

  @HostListener('document:click') hideCaledar() {
    this.dates.nativeElement.classList.remove('active');
  }
  constructor(
  ) { }

  ngOnInit(): void {
  }

  get finaltime() {
    // TODO: 最後送出記得加回時間差(看有沒有需要)
    return moment(this.selected_date + this.diffTime).format();
  }
  // header start
  prevYear(event: Event) {
    event.stopPropagation();
    this.today.subtract(1, 'y');// format才能操作
    this.headerDate = this.today.valueOf();
    this.datesCalendar();

  }

  prevMth(event: Event) {
    event.stopPropagation();
    this.today.subtract(1, 'M');
    this.headerDate = this.today.valueOf();
    this.datesCalendar();

  }
  nextYear(event: Event) {
    event.stopPropagation();
    this.today.add(1, 'y');
    this.headerDate = this.today.valueOf();
    this.datesCalendar();

  }

  nextMth(event: Event) {
    event.stopPropagation();
    this.today.add(1, 'M');
    this.headerDate = this.today.valueOf();
    this.datesCalendar();

  }

  prevDecade(event: Event) {
    event.stopPropagation();
    this.today.subtract(10, 'y');
    this.headerDate = this.today.valueOf();
    this.yearCalendar();
  }

  nextDecade(event: Event) {
    event.stopPropagation();
    this.today.add(10, 'y');
    this.headerDate = this.today.valueOf();
    this.yearCalendar();

  }
  // header end



  toggleCalendar(event: Event) {
    event.stopPropagation();
    this.dates.nativeElement.classList.toggle('active'); // 顯示日歷
    this.datesCalendar();
  }

  /** 產生月曆日期 */
  datesCalendar() {
    const startDay = this.today.clone().startOf('month'); // 當月起始日期
    const endDay = this.today.clone().endOf('month').startOf('d'); // 當月終止日期
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
  }

  /** 產生年份 */
  yearCalendar() {
    this.years = [];
    const startYear = this.today.clone().subtract(1, 'y');
    this.years.push(startYear, this.today.clone());
    for (let i = 0; i < 10; i++) {
      this.years.push(this.today.clone().add(i + 1, 'y'));
    }
  }

  showYear(event: Event) {
    event.stopPropagation();
    this.calendarMode = 'year';
    this.yearCalendar();
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

  /** 產生選中藍色框框 */
  presentDate(timestamp: number) {
    const date = this.today.format('MM-DD-YYYY');
    const today = moment(timestamp).format('MM-DD-YYYY');
    return date === today;
  }

  /**
   * 選取日期後，關閉日曆
   */
  selectDate(event: Event, timestamp: number) {
    event.stopPropagation();
    this.selected_date = timestamp;
    this.headerDate = timestamp;
    this.today = moment(timestamp);
    this.dates.nativeElement.classList.remove('active');
  }

  /** 選取年份，跳出該年份當月資訊 */
  selectYear(event: Event, timestamp: number) {
    event.stopPropagation();
    const diffYear = this.today.diff(timestamp, 'y');
    this.today.subtract(diffYear, 'y');
    this.headerDate = this.today.valueOf();
    this.datesCalendar();
    this.calendarMode = 'date'; // 切回日期頁
  }

  /** 直接選今天 */
  selectToday(event: Event) {
    event.stopPropagation();
    const timestamp = new Date().valueOf();
    this.selectDate(event, timestamp);
  }
}
