import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaSelectComponent } from './magma-select/magma-select.component';
import { MagmaSelectListComponent } from './magma-select-list/magma-select-list.component';
import { MagmaSelectOptionDirective } from './magma-select-option.directive';
import { MagmaInputModule } from '../inputs/magma-input.module';



@NgModule({
  declarations: [
    MagmaSelectComponent,
    MagmaSelectListComponent,
    MagmaSelectOptionDirective
  ],
  imports: [
    CommonModule,
    MagmaInputModule
  ],
  exports: [
    MagmaSelectComponent,
    MagmaSelectListComponent,
    MagmaSelectOptionDirective
  ]
})
export class MagmaSelectModule { }
