import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaSidenavComponent } from './magma-sidenav/magma-sidenav.component';
import { MagmaSidenavContainerComponent } from './magma-sidenav-container/magma-sidenav-container.component';
import { MagmaSidenavContentComponent } from './magma-sidenav-content/magma-sidenav-content.component';



@NgModule({
  declarations: [
    MagmaSidenavComponent,
    MagmaSidenavContainerComponent,
    MagmaSidenavContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaSidenavComponent,
    MagmaSidenavContainerComponent,
    MagmaSidenavContentComponent
  ]
})
export class MagmaSidenavModule { }
