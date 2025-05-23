import { Component, Input } from '@angular/core';
import { DialogComponentInterface } from '../../../../../magma-core/src/lib/components/dialog/magma-dialog.service';
import { MagmaDialogComponent } from '../../../../../magma-core/src/public-api';

@Component({
  selector: 'app-dialog-center',
  standalone: true,
  imports: [
    MagmaDialogComponent
  ],
  templateUrl: './dialog-center.component.html',
  styleUrl: './dialog-center.component.scss'
})
export class DialogCenterComponent implements DialogComponentInterface{

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
