import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'magma-checkbox',
  standalone: false,
  templateUrl: './magma-checkbox.component.html',
  styleUrl: './magma-checkbox.component.scss'
})
export class MagmaCheckboxComponent {

  @Input() id: string|number = ``
  @Input() checked: boolean = false
  @Output() checkedChange = new EventEmitter<boolean>()

  toggleCheckbox(event: Event) {
    event.stopPropagation()
    this.checked = !this.checked
    this.checkedChange.emit(this.checked)
  }

}
