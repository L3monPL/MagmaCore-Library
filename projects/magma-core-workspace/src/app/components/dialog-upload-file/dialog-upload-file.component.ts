import { Component, Input } from '@angular/core';
import { DialogComponentInterface, MagmaButonModule, MagmaDialogComponent, MagmaFileUploadModule } from '../../../../../magma-core/src/public-api';

@Component({
  selector: 'app-dialog-upload-file',
  standalone: true,
  imports: [
    MagmaDialogComponent,
    MagmaButonModule,
    MagmaFileUploadModule
  ],
  templateUrl: './dialog-upload-file.component.html',
  styleUrl: './dialog-upload-file.component.scss'
})
export class DialogUploadFileComponent implements DialogComponentInterface{

  @Input() data: any;
  closeDialog!: (result?: any) => void;

  submitForm() {
    const result = { ok: true, selected: 42 }
    this.closeDialog(result)
  }

  close() {
    this.closeDialog('close')
  }
  /////////////////////////////////////////

  files: File[] = []

  importFiles(){
    console.log(this.files)
  }

}
