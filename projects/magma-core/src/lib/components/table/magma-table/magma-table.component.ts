import { Component, Input } from '@angular/core';

@Component({
  selector: 'magma-table',
  standalone: false,
  templateUrl: './magma-table.component.html',
  styleUrl: './magma-table.component.scss'
})
export class MagmaTableComponent {

  @Input() loading = false
  
}
