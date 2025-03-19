import { Component, Input } from '@angular/core';

@Component({
  selector: 'magma-timeline-item',
  standalone: false,
  templateUrl: './magma-timeline-item.component.html',
  styleUrl: './magma-timeline-item.component.scss'
})
export class MagmaTimelineItemComponent {

  @Input() isLast: boolean = false
}
