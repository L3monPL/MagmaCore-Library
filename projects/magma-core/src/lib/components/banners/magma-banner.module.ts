import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaBannerComponent } from './magma-banner/magma-banner.component';



@NgModule({
  declarations: [
    MagmaBannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaBannerComponent
  ]
})
export class MagmaBannerModule { }
