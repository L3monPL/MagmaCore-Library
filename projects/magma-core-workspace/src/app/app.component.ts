import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { MagmaDialogComponent, MagmaDialogService, MagmaDropdownProfileMenuModule, MagmaMenuModule, MagmaNavMobileModule, MagmaNotificationComponent, MagmaNotificationService, MagmaRadioButtonModule, MagmaTableModule } from '../../../magma-core/src/public-api';
import { MagmaTimelineModule } from '../../../magma-core/src/lib/components/timeline/magma-timeline.module';
import { MagmaPaginationModule } from '../../../magma-core/src/lib/components/pagination/magma-pagination.module';
import { MagmaHeaderModule } from '../../../magma-core/src/lib/components/header/magma-header.module';
import { MagmaChipModule } from '../../../magma-core/src/lib/components/chip/magma-chip.module';
import { DialogCenterComponent } from './components/dialog-center/dialog-center.component';
import { DialogRightComponent } from './components/dialog-right/dialog-right.component';

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
    MagmaDialogComponent,
    MagmaTimelineModule,
    MagmaPaginationModule,
    MagmaRadioButtonModule,
    MagmaNavMobileModule,
    MagmaDropdownProfileMenuModule,
    MagmaTableModule,
    MagmaHeaderModule,
    MagmaMenuModule,
    MagmaChipModule
  ],
  providers: [MagmaDialogService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'MagmaCoreWorkspace';

  selectLabel?: string = 'Ford'
  selectLabel2?: any

  selectList?: Array<BrandSelect>

  constructor(
    private dialogService: MagmaDialogService,
    private notificationService: MagmaNotificationService
  ) { }

  ngOnInit() {
    this.checkScreenSize()

    this.selectList = [
      {id: 0, name: 'Ford'},
      {id: 1, name: 'Kia'},
      {id: 2, name: 'Mazda'},
    ];
  }

  usersList = [
    {
      id: 0,
      name: 'Testowy',
      surname: 'Tester',
      email: 'testowy@gmail.com',
      role: 'admin',
      createdAt: '10/04/2025'
    },
    {
      id: 1,
      name: 'Mikołaj',
      surname: 'Andrzejewski',
      email: 'mikolaj@gmail.com',
      role: 'admin',
      createdAt: '10/04/2025'
    },
    {
      id: 2,
      name: 'Anna',
      surname: 'Kowalska',
      email: 'anna.kowalska@gmail.com',
      role: 'user',
      createdAt: '10/04/2025'
    },
    {
      id: 3,
      name: 'Jan',
      surname: 'Nowak',
      email: 'jan.nowak@gmail.com',
      role: 'user',
      createdAt: '10/04/2025'
    },
    {
      id: 4,
      name: 'Katarzyna',
      surname: 'Wiśniewska',
      email: 'katarzyna.w@gmail.com',
      role: 'user',
      createdAt: '10/04/2025'
    },
    {
      id: 5,
      name: 'Piotr',
      surname: 'Zieliński',
      email: 'piotr.zielinski@gmail.com',
      role: 'user',
      createdAt: '10/04/2025'
    },
    {
      id: 6,
      name: 'Aleksandra',
      surname: 'Mazur',
      email: 'aleksandra.mazur@gmail.com',
      role: 'user',
      createdAt: '10/04/2025'
    },
    {
      id: 7,
      name: 'Tomasz',
      surname: 'Krawczyk',
      email: 'tomasz.krawczyk@gmail.com',
      role: 'user',
      createdAt: '10/04/2025'
    },
    {
      id: 8,
      name: 'Magdalena',
      surname: 'Wójcik',
      email: 'magdalena.wojcik@gmail.com',
      role: 'user',
      createdAt: '10/04/2025'
    },
    {
      id: 9,
      name: 'Kamil',
      surname: 'Dąbrowski',
      email: 'kamil.dabrowski@gmail.com',
      role: 'user',
      createdAt: '10/04/2025'
    },
    {
      id: 10,
      name: 'Natalia',
      surname: 'Kaczmarek',
      email: 'natalia.kaczmarek@gmail.com',
      role: 'user',
      createdAt: '10/04/2025'
    }
  ]

  checkBoxList = [
    {
      inputId: 'checkboxId1',
      name: 'Akcpetuje regulamin',
      isChecked: false
    },
    {
      inputId: 'checkboxId2',
      name: 'Akcpetuje podpisy',
      isChecked: false
    },
    {
      inputId: 'checkboxId3',
      name: 'Akcpetuje rozliczenie',
      isChecked: false
    }
  ]

  redioButtonSelectedId?: number|string = ''
  radioButtonSelect(radioButtonId: number|string){
    this.redioButtonSelectedId = radioButtonId
  }
  radioButtonList = [
    {
      inputId: 'radioId1',
      name: 'Akcpetuje regulamin',
      isChecked: false
    },
    {
      inputId: 'radioId2',
      name: 'Akcpetuje podpisy',
      isChecked: false
    },
    {
      inputId: 'radioId3',
      name: 'Akcpetuje rozliczenie',
      isChecked: false
    }
  ]

  detetListChecboxChange(){
    console.log(this.checkBoxList)
  }

  isOpen = true
  mode = 'side' //over //side

  @HostListener('window:resize', [])
    onResize() {
      this.checkScreenSize()
    }

  isLargeScreen?: boolean

  checkScreenSize(){
    const width = window.innerWidth;
    this.isLargeScreen = width >= 800;

    if (this.isLargeScreen) {
      if (this.mode != 'side') {
        this.mode = 'side'
        this.isOpen = true
      }
    }
    else{
      if (this.mode != 'over') {
        this.mode = 'over'
        this.isOpen = false
      }
    }
  }

  numberCount = 120234

  form = new FormGroup({
    numberCount: new FormControl(120234), // Możesz ustawić domyślną wartość
    date: new FormControl <Date|string>(new Date()),
    dateMonth: new FormControl <Date|string>(new Date()) 
  });

  openDialog() {
    this.dialogService.openDialog(DialogCenterComponent, {
      title: 'Custom Dialog',
      message: 'This is a custom message for the dialog.'
    }).then(result => {
      if (result) {
        console.log(result) 
      }
    });
  }

  showNotification(message: string) {
    this.notificationService.showNotification(MagmaNotificationComponent, { message: message, type: 'SUCCES' }, 3000)
  }

  currentPage = 1

  onPageChange(page: number) {
    this.currentPage = page;
    console.log('Nowa strona:', page);
  }

  isMobileMenuContainer = false

  //MAGMA MENU //
  selectedRole?: string | null = null

  selectMenuRole(name: string){
    this.selectedRole = name
  }

  openItemRightDialog(user: any){
    this.dialogService.openDialog(DialogRightComponent, {
      user: user,
      position: 'center'
    }).then(result => {
      if (result) {
        console.log(result) 
      }
    });
  }

}
