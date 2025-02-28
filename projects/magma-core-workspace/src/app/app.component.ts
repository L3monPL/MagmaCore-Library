import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MagmaButonModule, MagmaCardModule } from '../../../magma-core/src/public-api';
import { MagmaInputModule } from '../../../magma-core/src/lib/components/inputs/magma-input.module';
import { MagmaFormFieldModule } from '../../../magma-core/src/lib/components/forms/magma-form-field.module';
import { MagmaIconModule } from '../../../magma-core/src/lib/components/icon/magma-icon.module';
import { MagmaBannerModule } from '../../../magma-core/src/lib/components/banners/magma-banner.module';
import { MagmaSelectModule } from '../../../magma-core/src/lib/components/selects/magma-select.module';
import { FormsModule } from '@angular/forms';
// import { Card1Component } from 'MagmaCore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MagmaCardModule,
    MagmaButonModule,
    MagmaInputModule,
    MagmaFormFieldModule,
    MagmaIconModule,
    MagmaBannerModule,
    MagmaSelectModule,
    FormsModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MagmaCoreWorkspace';

  selectLabel?: string = 'Ford'
  selectLabel2?: string = ''

  selectOption(value: string) {
    this.selectLabel = value;
  }
  selectOption2(value: string) {
    this.selectLabel2 = value;
  }

}
