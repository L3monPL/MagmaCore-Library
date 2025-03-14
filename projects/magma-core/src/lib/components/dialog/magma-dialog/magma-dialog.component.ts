import { Component, Input } from '@angular/core';

@Component({
  selector: 'magma-dialog',
  standalone: true,
  imports: [],
  templateUrl: './magma-dialog.component.html',
  styleUrl: './magma-dialog.component.scss'
})
export class MagmaDialogComponent {

  @Input() data: any;
  closeDialog: Function = () => {};

  constructor() { }
  
}
