import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaCheckboxComponent } from './magma-checkbox/magma-checkbox.component';



@NgModule({
  declarations: [
    MagmaCheckboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaCheckboxComponent
  ]
})
export class MagmaCheckboxModule { }
