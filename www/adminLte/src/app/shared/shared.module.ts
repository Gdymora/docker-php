import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ButtonGlyphiconRefreshComponent } from './components/button-glyphicon-refresh/button-glyphicon-refresh.component';
import { MaterialDatepickerComponent } from './components/material-datepicker/material-datepicker.component';
import { TextEditableComponent } from './components/text-editable/text-editable.componentDirective';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectMultiAutocompleteComponent } from './components/select-multi-autocomplete/select-multi-autocomplete.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaskPhoneDirective } from './class/mask-fone.directive';
import { MaterialDaterangepickerComponent } from './components/material-daterangepicker/material-daterangepicker.component';
import { MatInputModule } from '@angular/material/input';
import { DateEditableComponent } from './components/date-editable/date-editable.componentDirective';
import { SelectMultiAutocompleteIdComponent } from './components/select-multi-autocomplete-id/select-multi-autocomplete-id.component';

@NgModule({
  declarations: [
    ButtonGlyphiconRefreshComponent,
    TextEditableComponent,
    MaterialDatepickerComponent,
    SelectMultiAutocompleteComponent,
    SelectMultiAutocompleteIdComponent,
    ConfirmDialogComponent,
    MaskPhoneDirective,
    MaterialDaterangepickerComponent,
    MaterialDaterangepickerComponent,
    DateEditableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [
    ButtonGlyphiconRefreshComponent,
    TextEditableComponent,
    MaterialDatepickerComponent,
    SelectMultiAutocompleteComponent,
    SelectMultiAutocompleteIdComponent,
    MaskPhoneDirective,
    MaterialDaterangepickerComponent,
    DateEditableComponent,
  ]
})
export class SharedModule { }
