import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTablesTableComponent } from './components/dynamic-tables-table/dynamic-tables-table.component';
import { DynamicTablesFormComponent } from './components/dynamic-tables-form/dynamic-tables-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicTablesComponent } from './components/dynamic-tables/dynamic-tables.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { ExampleComponent } from './dynamic-form/example.component';
import { TablesDynamicFormComponent } from './components/dynamic-tables-form/form.component';
import { MatButtonModule } from '@angular/material/button';
const routes: Routes = [
  { path: '', component: DynamicTablesComponent },
];
@NgModule({
  declarations: [
    DynamicTablesComponent,
    DynamicTablesTableComponent,
    DynamicTablesFormComponent,
    TablesDynamicFormComponent,
    ExampleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,    
    MatAutocompleteModule,
    DynamicFormModule
  ]
})
export class DynamicTablesModule { }
