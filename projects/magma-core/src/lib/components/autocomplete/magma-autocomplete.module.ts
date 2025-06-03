import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaAutocompleteComponent } from './magma-autocomplete/magma-autocomplete.component';
import { ProgressSpinnerModule } from '../progressSpinner/progress-spinner.module';



@NgModule({
  declarations: [
    MagmaAutocompleteComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports: [
    MagmaAutocompleteComponent
  ]
})
export class MagmaAutocompleteModule { }
