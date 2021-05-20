import { StartendService } from './../between-date/startend.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  title = 'time';
  /** 截止日 */
  closeDate = moment();
  test = new FormGroup({
    name: new FormControl(''),
    date: new FormControl('')
  });
  constructor() {
  }

  ngOnInit(): void {
  }



  showForm() {
    console.log(this.test.value);

  }
  date(ev) {
    this.test.get('date').setValue(ev);
  }

}
