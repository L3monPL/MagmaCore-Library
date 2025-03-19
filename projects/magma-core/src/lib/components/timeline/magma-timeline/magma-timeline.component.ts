import { Component, ContentChildren, QueryList } from '@angular/core';
import { MagmaTimelineItemComponent } from '../magma-timeline-item/magma-timeline-item.component';

@Component({
  selector: 'magma-timeline',
  standalone: false,
  templateUrl: './magma-timeline.component.html',
  styleUrl: './magma-timeline.component.scss'
})
export class MagmaTimelineComponent {

  @ContentChildren(MagmaTimelineItemComponent) items!: QueryList<MagmaTimelineItemComponent>;

  ngAfterContentInit() {
    this.updateLastItem();
    this.items.changes.subscribe(() => this.updateLastItem());
  }

  private updateLastItem() {
    this.items.forEach((item, index) => {
      item.isLast = index === this.items.length - 1;
    });
  }
}
