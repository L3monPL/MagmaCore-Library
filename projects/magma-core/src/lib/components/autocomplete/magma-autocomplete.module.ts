import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaAutocompleteComponent } from './magma-autocomplete/magma-autocomplete.component';



@NgModule({
  declarations: [
    MagmaAutocompleteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaAutocompleteComponent
  ]
})
export class MagmaAutocompleteModule { }
