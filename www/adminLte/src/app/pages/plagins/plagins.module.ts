import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlaginsComponent } from './plagins.component';
  
const routes: Routes = [
  { path: '', component: PlaginsComponent },
];

@NgModule({
  declarations: [
    PlaginsComponent
  ],
  imports: [    
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PlaginsModule { }
