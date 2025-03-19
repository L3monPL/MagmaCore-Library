import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaTimelineComponent } from './magma-timeline/magma-timeline.component';
import { MagmaTimelineItemComponent } from './magma-timeline-item/magma-timeline-item.component';



@NgModule({
  declarations: [
    MagmaTimelineComponent,
    MagmaTimelineItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaTimelineComponent,
    MagmaTimelineItemComponent
  ]
})
export class MagmaTimelineModule { }
