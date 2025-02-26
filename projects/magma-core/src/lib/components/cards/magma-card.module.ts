import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaCardComponent } from './magma-card/magma-card.component';



@NgModule({
  declarations: [
    MagmaCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaCardComponent
  ]
})
export class MagmaCardModule { }
