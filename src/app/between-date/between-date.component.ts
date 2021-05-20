import { StartendService } from './startend.service';

import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-between-date',
  templateUrl: './between-date.component.html',
  styleUrls: ['./between-date.component.scss'],
  providers: [StartendService]
})
export class BetweenDateComponent implements OnInit, AfterViewInit {
  /** 起日的時間 */
  startDate = moment().valueOf();
  /** 迄日的時間 */
  endDate = moment().add(1, 'd').valueOf();
  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cd.detectChanges();
  }

  selectStartDate(timestamp: number) {
    this.startDate = timestamp;
    if (this.startDate > this.endDate) {
      this.endDate = moment(timestamp).add(1, 'd').valueOf();
    }

  }
  selectEndDate(timestamp: number) {
    this.endDate = timestamp;
    if (this.endDate < this.startDate) {
      this.startDate = moment(timestamp).subtract(1, 'd').valueOf();
    }
  }

}
