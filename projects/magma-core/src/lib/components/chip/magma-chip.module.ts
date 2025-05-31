import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaChipComponent } from './magma-chip/magma-chip.component';
import { MagmaChipContentComponent } from './magma-chip-content/magma-chip-content.component';
import { MagmaFormFieldModule } from '../forms/magma-form-field.module';
import { MagmaDatePickerModule } from '../calendar/magma-date-picker.module';



@NgModule({
  declarations: [
    MagmaChipComponent,
    MagmaChipContentComponent
  ],
  imports: [
    CommonModule,
    MagmaFormFieldModule,
    MagmaDatePickerModule
  ],
  exports: [
    MagmaChipComponent,
    MagmaChipContentComponent
  ]
})
export class MagmaChipModule { }
