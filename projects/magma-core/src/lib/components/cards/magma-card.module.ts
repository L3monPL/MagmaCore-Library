import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaCardComponent } from './magma-card/magma-card.component';
import { MagmaCardTitleComponent } from './magma-card-title/magma-card-title.component';
import { MagmaCardSubtitleComponent } from './magma-card-subtitle/magma-card-subtitle.component';
import { MagmaCardActionsComponent } from './magma-card-actions/magma-card-actions.component';



@NgModule({
  declarations: [
    MagmaCardComponent,
    MagmaCardTitleComponent,
    MagmaCardSubtitleComponent,
    MagmaCardActionsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaCardComponent,
    MagmaCardTitleComponent,
    MagmaCardSubtitleComponent,
    MagmaCardActionsComponent
  ]
})
export class MagmaCardModule { }
