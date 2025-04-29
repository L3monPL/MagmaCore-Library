import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaPaginationComponent } from './magma-pagination/magma-pagination.component';



@NgModule({
  declarations: [
    MagmaPaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaPaginationComponent
  ]
})
export class MagmaPaginationModule { }
