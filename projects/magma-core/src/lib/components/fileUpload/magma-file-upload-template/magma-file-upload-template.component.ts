import { Component } from '@angular/core';

@Component({
  selector: 'magma-file-upload-template',
  standalone: false,
  templateUrl: './magma-file-upload-template.component.html',
  styleUrl: './magma-file-upload-template.component.scss'
})
export class MagmaFileUploadTemplateComponent {

  files: File[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private addFiles(fileList: FileList): void {
    for (let i = 0; i < fileList.length; i++) {
      this.files.push(fileList.item(i)!);
    }
  }

}
