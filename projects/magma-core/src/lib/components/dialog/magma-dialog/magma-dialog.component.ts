import { Component, Input } from '@angular/core';
import { DialogComponentInterface } from '../magma-dialog.service';

@Component({
  selector: 'magma-dialog',
  standalone: true,
  imports: [],
  templateUrl: './magma-dialog.component.html',
  styleUrl: './magma-dialog.component.scss'
})
export class MagmaDialogComponent implements DialogComponentInterface{

  @Input() data: any;
  closeDialog!: (result?: any) => void;

  submitForm() {
    const result = { ok: true, selected: 42 }
    this.closeDialog(result)
  }

  close() {
    this.closeDialog('close')
  }
  
}
