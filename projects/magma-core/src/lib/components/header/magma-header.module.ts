import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaHeaderComponent } from './magma-header/magma-header.component';



@NgModule({
  declarations: [
    MagmaHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaHeaderComponent
  ]
})
export class MagmaHeaderModule { }
