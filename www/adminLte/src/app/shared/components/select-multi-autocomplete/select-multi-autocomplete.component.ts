import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-select-multi-autocomplete',
  templateUrl: './select-multi-autocomplete.component.html',
  styleUrls: ['./select-multi-autocomplete.component.scss']
})

export class SelectMultiAutocompleteComponent implements OnInit {
  @Input() viewData: any;
  @Input() namePlaceholder: string;
  @Input() flag: string;
  @Output() filterSelectEmit = new EventEmitter();
  @Output() filterSelectOptionEmit: EventEmitter<string> = new EventEmitter<string>();
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  dataCtrl = new FormControl();
  datas: string[] = [];
  name = 'name';
  datasNumber: any[] = [];
  opened = false;
  lengthViewTooltip = 12;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];

  @ViewChild('dataInput') dataInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;


  constructor() { }

  ngOnInit(): void {
    if (this.viewData?.select) {
      this.datas = this.viewData.select;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.viewData.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(dataRemove: string): void {

    const index = this.datas.indexOf(dataRemove);
    this.datasNumber = [...this.datasNumber.filter(data => data.name !== dataRemove)];
    if (index >= 0) {
      this.datas.splice(index, 1);
    }
    if (this.flag === 'role') {
      this.filterSelectRole(dataRemove, 'remov');
    } else {
      this.filterSelect();
    }
  }



  selected(event: MatAutocompleteSelectedEvent): void {
    const newValue = event.option.viewValue;
    if (this.datas.includes(newValue)) {
      this.datas = [...this.datas.filter(data => data !== newValue)];
      this.datasNumber = [...this.datasNumber.filter(data => data.name !== newValue)];
    } else {
      this.datas.push(event.option.viewValue);
      this.datasNumber.push({ name: event.option.viewValue, id: event.option.value });
    }
    this.dataInput.nativeElement.value = '';
    this.dataCtrl.setValue(null);
    // keep the autocomplete opened after each item is picked.
    requestAnimationFrame(() => {
      this.openAuto(this.matACTrigger);
    });
    if (this.flag === 'role') {
      this.filterSelectRole(newValue, 'add');
    } else if (this.flag === 'namtask') {
      this.filterSelectNamTask();
    } else {
      this.filterSelect();
    }
  }
  private filterSelect(): void {
    const datasId = this.datasNumber.map(data => data.id);
    this.filterSelectEmit.emit(datasId);
  }

  private filterSelectRole(data: string, event: string): void {
    this.filterSelectEmit.emit({ data, event });
  }

  private filterSelectNamTask(): void {
    const datasId = this.datasNumber.map(data => data.id);  
    let codtask = [] as string[];
     datasId.forEach(taskData =>
      this.viewData.forEach(datas => { 
        if (datas.id === taskData) {
          codtask.push(datas.attributes.codtask)
        }         
      })
    )
   
    this.filterSelectEmit.emit(codtask);
  }


  onKeyStates(): void {
    const filter = this.dataCtrl.value?.toLowerCase();
    this.filterSelectOptionEmit.emit(filter);
  }

  openAuto(trigger: MatAutocompleteTrigger): void {
    trigger.openPanel();
    this.dataInput.nativeElement.focus();
  }
}
