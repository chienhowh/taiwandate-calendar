import { SimpleChanges } from '@angular/core';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, OnChanges {
  /** template 顯示都用timestamp 操作 */
  /** 會拿到當天日期的起始時間 不是當下要注意 */
  @ViewChild('dates') dates: ElementRef;
  //
  @Input() taiwanDate = true;
  /** 是否顯示民國字樣 */
  @Input() numberOnly = true;
  /** 截止日(超過此日期不能選) */
  @Input() closeDate: moment.Moment;

  /** 民國範圍年(截止) */
  @Input() rocEndYear = 200;

  /** 民國範圍年(起始) */
  @Input() rocStartYear = 1;
  /** 可以設定預設日期 */
  @Input() startDay = new Date().valueOf();
  /** 今天日期 for moment 運算，不是最後選定日 */
  today;
  /** 送出被選取事件 */
  @Output() outputDate = new EventEmitter<number>();
  /** 選擇時間與起始日差距 */
  // diffTime = this.today.diff(this.today.clone().startOf('d'));

  /** 日 */
  days = [];
  /** 年 */
  years = [];
  /** 月 */
  months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  /** 最後顯示日期 */
  selected_date: number;
  selected_year: number;
  selected_month: number;

  // 中文週
  weekZh = ['日', 'ㄧ', '二', '三', '四', '五', '六'];
  /** 日曆顯示模式 eg.年份、日期 */
  calendarMode = 'date';

  @HostListener('document:click', ['$event']) hideCaledar(event) {
    if (!this.eRef.nativeElement.contains(event.target) &&
      !event.target.className.includes('ant-select-item')) {
      this.dates.nativeElement.classList.remove('active');
    }
  }

  constructor(
    private eRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.today = moment(this.startDay).startOf('d');
    this.selected_date = this.today.valueOf();
    this.selected_year = this.today.year() - 1911;
    this.selected_month = this.today.month();
    this.yearCalendar();
    this.outputDate.emit(this.selected_date);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    const startDay = changes.startDay.currentValue;
    this.selected_date = startDay;
    this.today = moment(startDay);
    // 送出選取事件
    this.outputDate.emit(startDay);
  }

  // get finaltime() {
  //   // TODO: 最後送出記得加回時間差(看有沒有需要)
  //   return moment(this.selected_date + this.diffTime).format();
  // }
  // header start
  prevYear(event: Event) {
    event.stopPropagation();
    this.today.subtract(1, 'y'); // format才能操作
    this.datesCalendar();
  }

  prevMth(event: Event) {
    event.stopPropagation();
    this.today.subtract(1, 'M');
    this.datesCalendar();
    if (this.selected_month === 0) {
      this.selected_month = 11;
      this.selected_year -= 1;
    } else {
      this.selected_month -= 1;
    }
  }
  nextYear(event: Event) {
    event.stopPropagation();
    this.today.add(1, 'y');
    this.datesCalendar();
  }

  nextMth(event: Event) {
    event.stopPropagation();
    this.today.add(1, 'M');
    this.datesCalendar();
    if (this.selected_month === 11) {
      this.selected_month = 0;
      this.selected_year += 1;
    } else {
      this.selected_month += 1;
    }
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
      const date = startDay
        .clone()
        .subtract(startDay.day() - i, 'd')
        .valueOf();
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
      const date = endDay
        .clone()
        .add(i + 1, 'd')
        .valueOf();
      this.days.push(date);
    }
  }

  /** 產生年份 */
  yearCalendar() {
    for (let i = this.rocStartYear; i < this.rocEndYear; i++) {
      this.years.push(i);
    }
  }


  /**
   * 是否在當月的日期，不是的話給他灰色字體
   * @param timestamp
   */
  presentMth(timestamp: number) {
    const todayMth = this.today.month();
    const mth = moment(timestamp).month();
    return mth === todayMth;
  }

  // 樣式相關 start
  /** 是否超出截止日，超出截止日給他灰底 */
  overCloseDate(timestamp: number): boolean {
    if (this.closeDate) {
      const closeDate = this.closeDate.valueOf();
      return timestamp > closeDate;
    }
    return false;
  }

  /** 產生選中藍色框框 */
  presentDate(timestamp: number) {
    const date = this.today.format('MM-DD-YYYY');
    const today = moment(timestamp).format('MM-DD-YYYY');
    return date === today;
  }
  // 樣式相關 end

  /**
   * 選取日期後，關閉日曆
   */
  selectDate(event: Event, timestamp: number) {
    event.stopPropagation();
    // 超出截止日，不能選
    if (this.overCloseDate(timestamp)) {
      return;
    }
    // 非當前選擇月份，不能選
    const mth = moment(timestamp).month();
    if (mth !== this.selected_month) {
      return;
    }
    this.selected_date = timestamp;
    this.today = moment(timestamp);
    this.dates.nativeElement.classList.remove('active');
    // 送出選取事件
    this.outputDate.emit(timestamp);
  }

  /** 選取年份，跳出該年份當月資訊 */
  selectYear(value: number) {
    const year = +value + 1911;
    const diffyear = this.today.year() - year;
    this.today.subtract(diffyear, 'year');
    this.selected_year = this.today.year() - 1911;
    this.datesCalendar();
  }

  selectMonth(value: number) {
    const month = +value;
    const diffmonth = this.today.month() - month;
    this.today.subtract(diffmonth, 'M');
    this.selected_month = this.today.month();
    this.datesCalendar();
  }

  /** 直接選今天 */
  selectToday(event: Event) {
    event.stopPropagation();
    const timestamp = new Date().valueOf();
    this.selectDate(event, timestamp);
    this.calendarMode = 'date';
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
