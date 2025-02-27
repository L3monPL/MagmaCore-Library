import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaFormFieldComponent } from './magma-form-field/magma-form-field.component';



@NgModule({
  declarations: [
    MagmaFormFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaFormFieldComponent
  ]
})
export class MagmaFormFieldModule { }
