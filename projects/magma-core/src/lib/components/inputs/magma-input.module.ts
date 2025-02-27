import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaInputDirective } from './magma-input.directive';
import { MagmaLabelComponent } from './magma-label/magma-label.component';



@NgModule({
  declarations: [
    MagmaInputDirective,
    MagmaLabelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaInputDirective,
    MagmaLabelComponent
  ]
})
export class MagmaInputModule { }
