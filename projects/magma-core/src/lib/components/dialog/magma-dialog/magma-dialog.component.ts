import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'magma-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './magma-dialog.component.html',
  styleUrl: './magma-dialog.component.scss'
})
export class MagmaDialogComponent{

  @Input() data: any;
  @Input() position = 'center'
  // closeDialog!: (result?: any) => void;

  // submitForm() {
  //   const result = { ok: true, selected: 42 }
  //   this.closeDialog(result)
  // }

  // close() {
  //   this.closeDialog('close')
  // }
  
}
