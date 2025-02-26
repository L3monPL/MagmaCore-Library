import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaCardComponent } from './magma-card/magma-card.component';
import { MagmaCardTitleComponent } from './magma-card-title/magma-card-title.component';



@NgModule({
  declarations: [
    MagmaCardComponent,
    MagmaCardTitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaCardComponent,
    MagmaCardTitleComponent
  ]
})
export class MagmaCardModule { }
