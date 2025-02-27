import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaIconDirective } from './magma-icon.directive';



@NgModule({
  declarations: [
    MagmaIconDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaIconDirective
  ]
})
export class MagmaIconModule { }
