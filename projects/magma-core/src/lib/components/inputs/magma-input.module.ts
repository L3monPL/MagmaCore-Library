import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaInputDirective } from './magma-input.directive';
import { MagmaLabelComponent } from './magma-label/magma-label.component';
import { MagmaTextareaDirective } from './magma-textarea.directive';



@NgModule({
  declarations: [
    MagmaInputDirective,
    MagmaLabelComponent,
    MagmaTextareaDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaInputDirective,
    MagmaLabelComponent,
    MagmaTextareaDirective
  ]
})
export class MagmaInputModule { }
