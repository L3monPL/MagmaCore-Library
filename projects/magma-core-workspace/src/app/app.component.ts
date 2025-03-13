import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { MagmaButonModule, MagmaCardModule } from '../../../magma-core/src/public-api';
import { MagmaInputModule } from '../../../magma-core/src/lib/components/inputs/magma-input.module';
import { MagmaFormFieldModule } from '../../../magma-core/src/lib/components/forms/magma-form-field.module';
import { MagmaIconModule } from '../../../magma-core/src/lib/components/icon/magma-icon.module';
import { MagmaBannerModule } from '../../../magma-core/src/lib/components/banners/magma-banner.module';
import { MagmaSelectModule } from '../../../magma-core/src/lib/components/selects/magma-select.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MagmaCardModule } from '../../../magma-core/src/lib/components/cards/magma-card.module';
import { MagmaButonModule } from '../../../magma-core/src/lib/components/buttons/magma-button.module';
import { MagmaDatePickerModule } from '../../../magma-core/src/lib/components/calendar/magma-date-picker.module';
import { ProgressSpinnerModule } from '../../../magma-core/src/lib/components/progressSpinner/progress-spinner.module';
import { MagmaCheckboxModule } from '../../../magma-core/src/lib/components/checkbox/magma-checkbox.module';
import { MagmaSidenavModule } from '../../../magma-core/src/lib/components/nav/magma-sidenav.module';
import { CommonModule } from '@angular/common';
// import { Card1Component } from 'MagmaCore';

interface BrandSelect {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MagmaCardModule,
    MagmaButonModule,
    MagmaInputModule,
    MagmaFormFieldModule,
    MagmaIconModule,
    MagmaBannerModule,
    MagmaSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MagmaDatePickerModule,
    ProgressSpinnerModule,
    MagmaCheckboxModule,
    MagmaSidenavModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'MagmaCoreWorkspace';

  selectLabel?: string = 'Ford'
  selectLabel2?: any

  selectList?: Array<BrandSelect>

  ngOnInit() {
    this.selectList = [
      {id: 0, name: 'Ford'},
      {id: 1, name: 'Kia'},
      {id: 2, name: 'Mazda'},
    ];
  }

  checkBoxList = [
    {
      id: 0,
      name: 'Akcpetuje regulamin',
      isChecked: false
    },
    {
      id: 1,
      name: 'Akcpetuje podpisy',
      isChecked: false
    },
    {
      id: 2,
      name: 'Akcpetuje rozliczenie',
      isChecked: false
    }
  ]

  detetListChecboxChange(){
    console.log(this.checkBoxList)
  }

  isOpen = true
  mode = 'side' //over //side

  numberCount = 120234

}
