import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dynamic-tables-form',
  templateUrl: './dynamic-tables-form.component.html',
  styleUrls: ['./dynamic-tables-form.component.scss']
})
export class DynamicTablesFormComponent {
  @Output() saveClicked: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() destroyClicked: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  destroyHiden: boolean;
  form = this.data.form;
  public inputCtrlMarkup: FormControl = new FormControl();

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

}

