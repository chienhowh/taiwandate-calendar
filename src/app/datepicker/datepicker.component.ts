import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';

export const MY_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerComponent),
  multi: true,
};
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [MY_CONTROL_VALUE_ACCESSOR],
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {
  // 用來接收 setDisabledState 的狀態
  disabled = false;
  // 用來接收 registerOnChange 和 onTouched 傳入的方法
  onChange: (value) => {};
  onTouched: () => {};
  // 元件內必須找一個時機觸發 change 方法
  selectedDateChange() {
    this.onChange(this.selected_date);
  }
  // 以下是 ControlValueAccessor 需實做的方法
  writeValue(obj: any): void {
    this.selected_date = obj;
    console.log(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** template 顯示都用timestamp 操作 */
  /** 會拿到當天日期的起始時間 不是當下要注意 */
  @ViewChild('dates') dates: ElementRef;
  @Input() taiwanDate = true;
  /** 是否顯示民國字樣 */
  @Input() numberOnly = true;
  /** 截止日(超過此日期不能選) */
  @Input() closeDate: moment.Moment;

  /** 民國範圍年(截止) */
  @Input() rocEndYear = 200;

  /** 民國範圍年(起始) */
  @Input() rocStartYear = 1;
  /** 今天日期 for moment 運算，不是最後選定日 */
  today = moment();
  /** 選擇時間與起始日差距 */
  diffTime = this.today.diff(this.today.clone().startOf('d'));

  /** 日 */
  days = [];
  /** 年 */
  years = [];
  /** 月 */
  months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  /** 最後顯示日期 */
  selected_date = new Date().valueOf();
  selected_year = moment().year() - 1911;
  selected_month = moment().month();

  // 中文週
  weekZh = ['日', 'ㄧ', '二', '三', '四', '五', '六'];
  /** 日曆顯示模式 eg.年份、日期 */
  calendarMode = 'date';

  @HostListener('document:click') hideCaledar() {
    this.dates.nativeElement.classList.remove('active');
  }
  constructor() {}

  ngOnInit(): void {
    console.log(this.closeDate);
    this.yearCalendar();
  }

  get finaltime() {
    // TODO: 最後送出記得加回時間差(看有沒有需要)
    return moment(this.selected_date + this.diffTime).format();
  }
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

  prevDecade(event: Event) {
    event.stopPropagation();
    this.today.subtract(10, 'y');

    this.yearCalendar();
  }

  nextDecade(event: Event) {
    event.stopPropagation();
    this.today.add(10, 'y');

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
    // const years = [];
    // const presentYear = this.today.clone().year();
    // 頭
    // if (presentYear < this.rocStartYear + 1911 + 12) {
    //   const startYear = this.today.clone().startOf('d').subtract((this.rocStartYear + 1911), 'y');
    //   for (let i = 0; i < 12; i++) {
    //     years.push(startYear.clone().add(i), 'y');
    //   }
    // } else {
    // 正常
    // const startYear = this.today.clone().startOf('d').subtract(1, 'y');
    // years.push(startYear, this.today.clone());
    // for (let i = 0; i < 10; i++) {
    //   years.push(this.today.clone().add(i + 1, 'y'));
    // }
    // // }
    // this.years = years;
    for (let i = this.rocStartYear; i < this.rocEndYear; i++) {
      this.years.push(i);
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
    this.selectedDateChange();
  }

  /** 選取年份，跳出該年份當月資訊 */
  selectYear(ev: Event) {
    ev.stopPropagation();
    const year = +(ev.target as HTMLSelectElement).value + this.toROC;
    const diffyear = this.today.year() - year;
    this.today.subtract(diffyear, 'year');
    this.selected_year = this.today.year() - 1911;
    this.datesCalendar();
  }

  selectMonth(ev: Event) {
    ev.stopPropagation();
    const month = +(ev.target as HTMLSelectElement).value;
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
