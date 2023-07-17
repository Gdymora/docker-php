import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
    <mat-form-field appearance="outline" class="input_block"
      [ngClass]="config.class_field"
      [formGroup]="group">
      <mat-label>{{ config.label }}</mat-label>
      <input
        type="text"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name" 
        matInput
        autocomplete="off"
        >
    </mat-form-field>
  `
})
export class FormInputComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup;
}