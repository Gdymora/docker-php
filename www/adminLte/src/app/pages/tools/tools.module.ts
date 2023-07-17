import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToolsComponent } from './tools.component';
  
const routes: Routes = [
  { path: '', component: ToolsComponent },
];

@NgModule({
  declarations: [
    ToolsComponent
  ],
  imports: [    
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ToolsModule { }
