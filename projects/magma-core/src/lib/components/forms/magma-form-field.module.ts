import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaFormFieldComponent } from './magma-form-field/magma-form-field.component';
import { MagmaDatePickerModule } from '../calendar/magma-date-picker.module';



@NgModule({
  declarations: [
    MagmaFormFieldComponent,
  ],
  imports: [
    CommonModule,
    MagmaDatePickerModule
  ],
  exports: [
    MagmaFormFieldComponent
  ]
})
export class MagmaFormFieldModule { }
