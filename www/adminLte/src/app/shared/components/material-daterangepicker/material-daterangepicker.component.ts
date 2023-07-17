import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { MY_DATE_FORMATS } from '../../library/my-date-formats';

@Component({
  selector: 'app-material-daterangepicker',
  templateUrl: './material-daterangepicker.component.html',
  styleUrls: ['./material-daterangepicker.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class MaterialDaterangepickerComponent implements OnInit {
  @Input() flag: boolean = false;
  @Output() datePicker: EventEmitter<string> = new EventEmitter<string>();
  campaignOne: FormGroup;
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  minDate = '2018-01-01';
  maxDate = new Date();

  constructor() {

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(this.year, this.month, this.today.getDay() - 1)),
      end: new FormControl(new Date(this.year, this.month, this.today.getDay())),
    });
  }

  ngOnInit(): void {
    this.campaignOne.valueChanges.subscribe((form) => {
      if (form.start && form.end) {
        const date = moment(form.start).format('DD.MM.YYYY') + ',' + moment(form.end).format('DD.MM.YYYY');
        this.datePicker.emit(date);
      }
    });
  }
}
