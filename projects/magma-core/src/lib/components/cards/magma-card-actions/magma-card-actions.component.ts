import { Component, Input } from '@angular/core';

@Component({
  selector: 'magma-card-actions',
  standalone: false,
  templateUrl: './magma-card-actions.component.html',
  styleUrl: './magma-card-actions.component.scss'
})
export class MagmaCardActionsComponent {

  @Input() justify?: string = 'end'
}
