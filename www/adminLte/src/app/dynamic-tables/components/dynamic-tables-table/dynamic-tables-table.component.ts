import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getDictRegionsForm } from '../../shared/class/formDictRegionsform';
import { DynamicTablesFormComponent } from '../dynamic-tables-form/dynamic-tables-form.component';
import { DataSource } from '@angular/cdk/collections'; 
import { TablesDynamicFormComponent } from '../dynamic-tables-form/form.component';
import { IDictionary } from 'src/app/shared/interfaces/dictionary-post.interface';

@Component({
  selector: 'app-dynamic-tables-table',
  templateUrl: './dynamic-tables-table.component.html',
  styleUrls: ['./dynamic-tables-table.component.scss']
})
export class DynamicTablesTableComponent implements AfterViewInit {
  @Input() viewData: any;
  @Output() tablePagesEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() saveUpdateClicked: EventEmitter<{ form: any, id: number | null, type: string | null }> =
    new EventEmitter<{ form: any, id: number | null, type: string | null }>();
  @Output() saveCreateClicked: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() destroyClicked: EventEmitter<number | null> =
    new EventEmitter<number | null>();

  @Output() tableFilterApply: EventEmitter<{ event: KeyboardEvent, pages: PageEvent }> =
    new EventEmitter<{ event: KeyboardEvent, pages: PageEvent }>();
  @Output() tableLoadSort: EventEmitter<object> = new EventEmitter<object>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('inputName') inputName: any;

  page!: PageEvent;
  pageSize!: number;
  pageSizeOptions = [50, 10, 20, 3, 100];
  dataSource!: MatTableDataSource<any>;
  constructor(public dialog: MatDialog) {

  }

  columns = [
    { columnDef: 'id', header: 'No.', cell: (element: IDictionary) => element.id },
    { columnDef: 'word', header: 'Name', cell: (element: IDictionary) => element.word["ua"] },
    { columnDef: 'translate', header: 'Namuser', cell: (element: IDictionary) => element.translate },
    { columnDef: 'partsOfspech', header: 'Namuser', cell: (element: IDictionary) => element.partsOfspech },
  ];

  displayedColumns = this.columns.map(result => result.columnDef);

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.viewData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    /*  merge(this.sort.sortChange)
       .pipe(
         tap(() => this.loadComponentsPage()
         ))
       .subscribe(); */
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadComponentsPage(): void {
    this.tableLoadSort.emit({ filter: this.filterset(), sort: this.sort });
  }

  filterset(): object {
    return {
      name: this.inputName.nativeElement.value,
    };
  }

  getNavigate(event?: PageEvent): void {
    this.tablePagesEvent.emit(event);
  }

  filterApply(events: any): void {
    this.tableFilterApply.emit({ event: events, pages: this.paginator });
  }


  onUpdateFormDialogClicked(row: any): void | null {
    const dialogRef = this.dialog.open(
      TablesDynamicFormComponent, {
      data: { form: row, destroy: true, selectedStates: this.viewData}
    });

    dialogRef.componentInstance.saveClicked.subscribe(result => {
      console.log(result)
      this.saveUpdateClicked.emit({ form: result, id: row.id, type: row.type });
    });

    dialogRef.componentInstance.destroyClicked.subscribe(result => {
      this.destroyClicked.emit(row.id);
    });

    dialogRef.afterClosed().subscribe();
  }

  onNewFormDialogClicked(): void {
    const dialogRef = this.dialog.open(
      DynamicTablesFormComponent, {
      data: { form: this.inputFormCreate(), destroy: false, selectedStates: this.viewData}
    });

    dialogRef.componentInstance.saveClicked.subscribe(result => {
      this.saveCreateClicked.emit(result);
    });

    dialogRef.afterClosed().subscribe();
  }

  inputFormUpdate(row: any): FormGroup {
    return getDictRegionsForm(row);
  }

  inputFormCreate(): FormGroup {
    return getDictRegionsForm();
  }

}