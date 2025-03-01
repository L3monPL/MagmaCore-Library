import { Component } from '@angular/core';

@Component({
  selector: 'magma-date-picker',
  standalone: false,
  templateUrl: './magma-date-picker.component.html',
  styleUrl: './magma-date-picker.component.scss'
})
export class MagmaDatePickerComponent {

  currentDate = new Date()
  selectedDate: Date | null = null
  days: Array<number> = []

  constructor() {
    this.generateCalendar();
  }

  changeMonth(offset: number) {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + offset, 1)
    this.generateCalendar()
  }

  selectDate(day: number) {
    this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
  }

  isSelected(day: number): boolean {
    return this.selectedDate! &&
           this.selectedDate.getFullYear() === this.currentDate.getFullYear() &&
           this.selectedDate.getMonth() === this.currentDate.getMonth() &&
           this.selectedDate.getDate() === day;
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear()
    const month = this.currentDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  }
}
