import { Component, Input, OnInit } from '@angular/core';
import { DialogComponentInterface, MagmaButonModule, MagmaCardModule, MagmaDialogComponent, MagmaFormFieldModule, MagmaInputModule } from '../../../../../magma-core/src/public-api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-right',
  standalone: true,
  imports: [
    MagmaDialogComponent,
    MagmaButonModule,
    MagmaInputModule,
    MagmaFormFieldModule,
    MagmaCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-right.component.html',
  styleUrl: './dialog-right.component.scss'
})
export class DialogRightComponent implements DialogComponentInterface, OnInit{

  @Input() data: any;
  closeDialog!: (result?: any) => void;

  submitForm() {
    const result = { ok: true, selected: 42 }
    this.closeDialog(result)
  }

  close() {
    this.closeDialog('close')
  }

  // ----------------------------------------------------- //

  ngOnInit(): void {
    this.setForm()
  }

  form = new FormGroup({
    name: new FormControl<string>(''),
    surname: new FormControl <string>(''),
    email: new FormControl <string>(''),
    role: new FormControl <string>(''),
    createdAt: new FormControl <Date|string>('') 
  });

  setForm(){
    this.form.setValue(
      {
        name: this.data.user.name,
        surname: this.data.user.surname,
        email: this.data.user.email,
        role: this.data.user.role,
        createdAt: this.data.user.createdAt
      }
    )

    this.form.get('createdAt')?.disable()
  }

}
