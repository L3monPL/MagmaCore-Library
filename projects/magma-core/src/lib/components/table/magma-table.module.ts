import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaTableComponent } from './magma-table/magma-table.component';
import { ProgressSpinnerModule } from '../progressSpinner/progress-spinner.module';



@NgModule({
  declarations: [
    MagmaTableComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports: [
    MagmaTableComponent
  ]
})
export class MagmaTableModule { }
