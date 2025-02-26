import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaButtonDirective } from './magma-button.directive';



@NgModule({
  declarations: [
    MagmaButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaButtonDirective
  ]
})
export class MagmaButonModule { }
