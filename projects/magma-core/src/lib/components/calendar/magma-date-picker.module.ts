import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaDatePickerComponent } from './magma-date-picker/magma-date-picker.component';



@NgModule({
  declarations: [
    MagmaDatePickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaDatePickerComponent
  ]
})
export class MagmaDatePickerModule { }
