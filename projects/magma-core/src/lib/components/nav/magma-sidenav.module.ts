import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagmaSidenavComponent } from './magma-sidenav/magma-sidenav.component';
import { MagmaSidenavContainerComponent } from './magma-sidenav-container/magma-sidenav-container.component';
import { MagmaSidenavContentComponent } from './magma-sidenav-content/magma-sidenav-content.component';
import { MagmaSidenavItemComponent } from './magma-sidenav-item/magma-sidenav-item.component';
import { MagmaSidenavLabelComponent } from './magma-sidenav-label/magma-sidenav-label.component';



@NgModule({
  declarations: [
    MagmaSidenavComponent,
    MagmaSidenavContainerComponent,
    MagmaSidenavContentComponent,
    MagmaSidenavItemComponent,
    MagmaSidenavLabelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagmaSidenavComponent,
    MagmaSidenavContainerComponent,
    MagmaSidenavContentComponent,
    MagmaSidenavItemComponent,
    MagmaSidenavLabelComponent
  ]
})
export class MagmaSidenavModule { }
