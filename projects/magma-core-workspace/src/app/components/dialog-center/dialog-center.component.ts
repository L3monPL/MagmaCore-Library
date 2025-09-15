import { Component, Input, OnInit } from '@angular/core';
import { DialogComponentInterface } from '../../../../../magma-core/src/lib/components/dialog/magma-dialog.service';
import { MagmaButonModule, MagmaCardModule, MagmaDialogComponent, MagmaFormFieldModule, MagmaInputModule, MagmaSelectModule } from '../../../../../magma-core/src/public-api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-center',
  standalone: true,
  imports: [
    MagmaDialogComponent,
    MagmaButonModule,
    MagmaSelectModule,
    MagmaFormFieldModule,
    MagmaCardModule,
    MagmaInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-center.component.html',
  styleUrl: './dialog-center.component.scss'
})
export class DialogCenterComponent implements DialogComponentInterface, OnInit{

  @Input() data: any;
  closeDialog!: (result?: any) => void;

  submitForm() {
    const result = { ok: true, selected: 42 }
    this.closeDialog(result)
  }

  close() {
    this.closeDialog('close')
  }

  selectList?: Array<any>
  
  ngOnInit(): void {
    this.selectList = [
      {id: 0, name: 'Ford'},
      {id: 1, name: 'Kia'},
      {id: 2, name: 'Mazda'},
      {id: 3, name: 'Mazda1'},
      {id: 4, name: 'Mazda2'},
      {id: 5, name: 'Mazda3'},
      {id: 6, name: 'Mazda4'},
      {id: 7, name: 'Mazda5'},
      {id: 8, name: 'Mazda6'},
    ];
  }

  form = new FormGroup({
    selectCar: new FormControl(null),
  });
}
