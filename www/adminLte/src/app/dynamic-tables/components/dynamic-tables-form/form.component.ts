import { Component, EventEmitter, ViewChild, AfterViewInit, Output, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicFormComponent } from '../../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../dynamic-form/models/field-config.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { IDictionary } from 'src/app/shared/interfaces/dictionary-post.interface';

@Component({

  selector: 'tables-dynamic-form',
  styles: ['h1 { font-weight: normal; }'],
  template: `
    <mat-dialog-content>
    <div mat-dialog-close sclass="close right">x</div>
      <dynamic-form 
        [config]="config"
        #form="dynamicForm"
        (submit)="submit($event)">
      </dynamic-form>  
      
    </mat-dialog-content>
  `
})
export class TablesDynamicFormComponent implements AfterViewInit {
  @ViewChild(DynamicFormComponent) form!: DynamicFormComponent;
  @Output() saveClicked: EventEmitter<IDictionary> = new EventEmitter<IDictionary>();
  @Output() destroyClicked: EventEmitter<IDictionary> = new EventEmitter<IDictionary>();
  destroyHiden: boolean;
  formData = this.data.form;

  config: FieldConfig[] = [
    {
      class_field: ["input_block"],
      type: 'input',
      label: 'Англійською',
      name: 'translate',
      placeholder: 'Enter your data',
      validation: [Validators.required]
    },
    {
      class_field: ["input_block"],
      type: 'input',
      label: 'Українською',
      name: 'ua',
      placeholder: 'Enter your data',
      validation: [Validators.required]
    },
    {
      class_field: ["input_block"],
      type: 'input',
      label: 'Російською',
      name: 'ru',
      placeholder: 'Enter your data',
      validation: [Validators.required]
    },
    {
      label: 'Зберігти',
      name: 'submit',
      type: 'button',
      color: 'primary'
    },
    {
      label: 'Видалити',
      name: 'delete',
      type: 'button',
      color: 'warn'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.destroyHiden = this.data.destroy;
  }

  onSave(): void {
    this.saveClicked.emit(this.data.form);
  }

  onDestroy(): void {
    this.destroyClicked.emit(this.data.form);
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
    console.log(this.formData)
    this.form.setDisabled('submit', true);
    this.form.setValue('translate', this.formData.translate ? this.formData.translate : null);
    this.form.setValue('ua', this.formData.word.ua ? this.formData.word.ua : null);
    this.form.setValue('ru', this.formData.word.ru ? this.formData.word.ru : null);
  }

  /*  submit(value: { [name: string]: any }) {
     console.log(value);
   }
 
 
   delete() {
     console.log("value");
   } */
  submit(value: { [name: string]: any }): void {
    this.formData.translate = value['translate'];
    this.formData.word = { ua: value['ua'], ru: value['ru'] };
    this.saveClicked.emit(this.formData);
  }

  delete(value: { [name: string]: any }) {
    this.formData.translate = value['translate'];
    this.formData.word = { ua: value['ua'], ru: value['ru'] };
    this.destroyClicked.emit(this.formData);
    this.dialogRef.close();
  }

}
