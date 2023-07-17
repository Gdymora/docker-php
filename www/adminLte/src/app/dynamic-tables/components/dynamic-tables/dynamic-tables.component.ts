import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ServiceService } from '../../shared/services/service.service';

@Component({
  selector: 'app-dynamic-tables',
  templateUrl: './dynamic-tables.component.html',
  styleUrls: ['./dynamic-tables.component.scss']
})
export class DynamicTablesComponent implements OnInit {
  viewData!: any[];

/* для багаторазового  columnsTable використання можна передавати сюди з батьківського елемента */

  columnsTable = [
    { columnDef: 'id', header: 'No.',    cell: (element: any) => element.id },
    { columnDef: 'name', header: 'Name',    cell: (element: any) => element.attributes.name },
    { columnDef: 'namuser', header: 'Namuser',    cell: (element: any) => element.attributes.namuser },
  ];

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getDataType({ obj: {}, eventSortDirection: '', eventSortActive: '', pageIndex: 1, pageSize: 10 });
  }


  getDataType(data: { obj: object, eventSortDirection: string, eventSortActive: string, pageIndex: number, pageSize: number }): void {
    this.serviceService.get("data.obj")
      .subscribe(response => {
        console.log(response);
        this.viewData  = response;
      });
  }

  getServerNavigateData(event: PageEvent): void {
    this.getDataType({ obj: {}, eventSortDirection: '', eventSortActive: '', pageIndex: event.pageIndex + 1, pageSize: event.pageSize });
  }

  getServerNavigateFilterApply(event$: { event: KeyboardEvent, pages: PageEvent }): void {
    const filterValue = (event$.event.target as HTMLInputElement).value.trim().toLowerCase();
    const filterName = (event$.event.target as HTMLInputElement).name;
    this.getDataType({
      obj: { [filterName]: filterValue }, eventSortDirection: '', eventSortActive: '', pageIndex: event$.pages.pageIndex + 1,
      pageSize: event$.pages.pageSize
    });
  }

  getServerSortTable(event: any): void {
    this.getDataType({
      obj: event.filter,
      eventSortDirection: event.sort.direction, eventSortActive: event.sort.active,
      pageIndex: event.paginator.pageIndex + 1, pageSize: event.paginator.pageSize
    });
  }

  getCreateForm(event: FormGroup): void {
    const stone = {} as any;
    stone.attributes = event.value;
   /*  this.serviceService.create(stone).subscribe(
      (resp: any) => {
        this.viewData[`data`].push(resp.data);
        this.viewData['data'.toString()] = this.viewData['data'.toString()].map((data: any )=> data);
      }
    ); */
  }

  getUpdateForm(event: { form: FormGroup, id: number | null, type: string | null }): void {
    const stone = {} as any;
    stone.attributes = event.form.value;
    stone.id = event.id;
    stone.type = event.type;
   /*  this.serviceService.update(stone).subscribe(
      (resp: any) => {
        this.viewData['data'.toString()].find(data => data.id === resp.data.id).attributes = resp.data.attributes;
      }
    ); */
  }

  getDestroyForm(id: number | null): void {
   /*  this.serviceService.destroy(id).subscribe(
      resp => {
        this.viewData[`data`] = this.viewData[`data`].filter(data => data.id !== id);
      }
    ); */
  }

}

