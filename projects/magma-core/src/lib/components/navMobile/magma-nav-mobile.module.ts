import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaNavMobileComponent } from './magma-nav-mobile/magma-nav-mobile.component';
import { MagmaNavMobileButtonComponent } from './magma-nav-mobile-button/magma-nav-mobile-button.component';



@NgModule({
  declarations: [
    MagmaNavMobileComponent,
    MagmaNavMobileButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaNavMobileComponent,
    MagmaNavMobileButtonComponent
  ]
})
export class MagmaNavMobileModule { }
