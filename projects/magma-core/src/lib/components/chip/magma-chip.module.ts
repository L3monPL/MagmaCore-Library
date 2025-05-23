import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaChipComponent } from './magma-chip/magma-chip.component';
import { MagmaChipContentComponent } from './magma-chip-content/magma-chip-content.component';



@NgModule({
  declarations: [
    MagmaChipComponent,
    MagmaChipContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaChipComponent,
    MagmaChipContentComponent
  ]
})
export class MagmaChipModule { }
