import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'magma-radio-button',
  standalone: false,
  templateUrl: './magma-radio-button.component.html',
  styleUrl: './magma-radio-button.component.scss'
})
export class MagmaRadioButtonComponent {

  @Input() id: string|number = ``
  @Input() radioButtonSelectedId?: string
  @Output() checkedChange = new EventEmitter<string|number>()

  toggleCheckbox(event: Event) {
    event.stopPropagation()

    console.log('click')

    // this.checked = !this.checked

    // console.log(this.checked)

    this.checkedChange.emit(this.id)
  }
}
