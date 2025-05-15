import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaTableComponent } from './magma-table/magma-table.component';



@NgModule({
  declarations: [
    MagmaTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaTableComponent
  ]
})
export class MagmaTableModule { }
