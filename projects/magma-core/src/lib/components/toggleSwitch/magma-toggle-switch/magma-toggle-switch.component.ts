import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'magma-toggle-switch',
  standalone: false,
  templateUrl: './magma-toggle-switch.component.html',
  styleUrl: './magma-toggle-switch.component.scss'
})
export class MagmaToggleSwitchComponent {

  @Input() checked = false;
  @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.checkedChange.emit(this.checked)
  }
  
}
