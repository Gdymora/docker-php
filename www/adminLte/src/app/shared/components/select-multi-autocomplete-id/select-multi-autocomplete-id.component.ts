import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-select-multi-autocomplete-id',
  templateUrl: './select-multi-autocomplete-id.component.html',
  styleUrls: ['./select-multi-autocomplete-id.component.scss']
})

export class SelectMultiAutocompleteIdComponent implements OnInit {
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
    /*  if (this.viewData?.select) {
       this.datas = this.viewData.select;
     } */
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
    this.datasNumber = [...this.datasNumber.filter(data => data.id !== dataRemove)];
    this.filterSelect();
  }

  onToggle(id: number) {
    const element = this.datasNumber.find(x => x.id === id);
    return element ? true : false;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const newValue = event.option.value;
    if (this.onToggle(newValue)) {
      this.datasNumber = [...this.datasNumber.filter(data => data.id !== newValue)];
    } else {
      this.datasNumber.push({ name: event.option.viewValue, id: event.option.value });
    }
    this.dataInput.nativeElement.value = '';
    this.dataCtrl.setValue(null);
    // keep the autocomplete opened after each item is picked.
    requestAnimationFrame(() => {
      this.openAuto(this.matACTrigger);
    });
    if (this.flag === 'namtask') {
      this.filterSelectNamTask();
    } else {
      this.filterSelect();
    }
  }
  private filterSelect(): void {
    const datasId = this.datasNumber.map(data => data.id);
    this.filterSelectEmit.emit(datasId);
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
