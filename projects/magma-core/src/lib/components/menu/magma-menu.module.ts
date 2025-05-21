import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaMenuComponent } from './magma-menu/magma-menu.component';



@NgModule({
  declarations: [
    MagmaMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaMenuComponent
  ]
})
export class MagmaMenuModule { }
