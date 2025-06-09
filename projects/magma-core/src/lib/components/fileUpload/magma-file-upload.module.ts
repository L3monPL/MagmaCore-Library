import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaFileUploadTemplateComponent } from './magma-file-upload-template/magma-file-upload-template.component';



@NgModule({
  declarations: [
    MagmaFileUploadTemplateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaFileUploadTemplateComponent
  ]
})
export class MagmaFileUploadModule { }
