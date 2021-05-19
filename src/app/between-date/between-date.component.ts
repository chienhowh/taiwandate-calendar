import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-between-date',
  templateUrl: './between-date.component.html',
  styleUrls: ['./between-date.component.scss']
})
export class BetweenDateComponent implements OnInit {
/** 迄日的時間 */
  endDay = moment().add(1, 'd').valueOf();

  constructor() { }

  ngOnInit(): void {
  }

  selectStartDate(timestamp: number) {
    console.log(timestamp);
    if(timestamp>this.endDay){
      this.endDay = moment(timestamp).add(1,'d').valueOf();
    }

  }
  add() {
  }
}
