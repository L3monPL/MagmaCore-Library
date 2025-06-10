import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'magma-file-upload-template',
  standalone: false,
  templateUrl: './magma-file-upload-template.component.html',
  styleUrl: './magma-file-upload-template.component.scss'
})
export class MagmaFileUploadTemplateComponent {

  @Input() files: File[] = []
  @Input() multiple: boolean = false

  @Output() filesChange = new EventEmitter<File[]>()

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
    let newFiles: File[];

  if (this.multiple) {
    newFiles = [...this.files];
    for (let i = 0; i < fileList.length; i++) {
      newFiles.push(fileList.item(i)!);
    }
  } else {
    newFiles = fileList.length ? [fileList.item(0)!] : [];
  }

  this.files = newFiles;
  this.filesChange.emit(this.files)
  }

  removeFile(index: number, event: any): void {
    event.stopPropagation()
    this.files = this.files.filter((_, i) => i !== index);
    this.filesChange.emit(this.files);
  }

}
