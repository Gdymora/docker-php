import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-material-datepicker',
  templateUrl: './material-datepicker.component.html',
  styleUrls: ['./material-datepicker.component.css']
})
export class MaterialDatepickerComponent implements OnInit {
  @Output() datePicker: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  form: FormGroup;
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear() - 2;

  minDate = new Date(this.year, this.month, 13);
  maxDate = new Date();
  dateMinArrival;

  constructor(private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      dateArrival: '',
    });
    this.form.valueChanges.subscribe((form) => {
        this.datePicker.emit(form);
    });
  }
}
