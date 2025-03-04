import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaDatePickerComponent } from './magma-date-picker/magma-date-picker.component';
import { MagmaInputModule } from 'MagmaCore';



@NgModule({
  declarations: [
    MagmaDatePickerComponent
  ],
  imports: [
    CommonModule,
    MagmaInputModule
  ],
  exports: [
    MagmaDatePickerComponent
  ]
})
export class MagmaDatePickerModule { }
