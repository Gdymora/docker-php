import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MediaFilesComponent } from './media-files.component';
 
const routes: Routes = [
  { path: '', component: MediaFilesComponent },
];

@NgModule({
  declarations: [
    MediaFilesComponent
  ],
  imports: [    
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MediaFilesModule { }
