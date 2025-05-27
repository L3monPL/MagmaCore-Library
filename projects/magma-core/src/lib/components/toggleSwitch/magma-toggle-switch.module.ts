import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaToggleSwitchComponent } from './magma-toggle-switch/magma-toggle-switch.component';



@NgModule({
  declarations: [
    MagmaToggleSwitchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaToggleSwitchComponent
  ]
})
export class MagmaToggleSwitchModule { }
