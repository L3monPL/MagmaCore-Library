import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaDatePickerComponent } from './magma-date-picker/magma-date-picker.component';
import { MagmaDateRangeInputComponent } from './magma-date-range-input/magma-date-range-input.component';
import { MagmaInputModule } from '../inputs/magma-input.module';




@NgModule({
  declarations: [
    MagmaDatePickerComponent,
    MagmaDateRangeInputComponent
  ],
  imports: [
    CommonModule,
    MagmaInputModule
  ],
  exports: [
    MagmaDatePickerComponent,
    MagmaDateRangeInputComponent
  ]
})
export class MagmaDatePickerModule { }
