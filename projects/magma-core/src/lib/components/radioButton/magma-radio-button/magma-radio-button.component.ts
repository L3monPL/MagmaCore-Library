import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'magma-radio-button',
  standalone: false,
  templateUrl: './magma-radio-button.component.html',
  styleUrl: './magma-radio-button.component.scss'
})
export class MagmaRadioButtonComponent {

  @Input() id: string|number = ``
  @Input() checked: boolean = false
  @Output() checkedChange = new EventEmitter<any>()

  toggleCheckbox(event: Event) {
    event.stopPropagation()
    this.checked = !this.checked
    this.checkedChange.emit(this.id)
  }
}
