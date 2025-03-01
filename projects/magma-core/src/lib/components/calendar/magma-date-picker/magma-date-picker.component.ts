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
  // days: Array<number|null> = []
  days: Array<{ day: number, isCurrentMonth: boolean }> = []
  // months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  isMonthSelection = false

  constructor() {
    this.generateCalendar();
  }

  changeMonth(offset: number) {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + offset, 1)
    this.generateCalendar()
  }

  selectDate(day: number, isCurrentMonth: boolean) {
    if (day !== null && isCurrentMonth) {
      let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
      this.selectedDate = date
      console.log(this.selectedDate)
    }
  }

  isSelected(day: number, isCurrentMonth: boolean): boolean {
    return this.selectedDate! &&
           isCurrentMonth &&
           this.selectedDate.getFullYear() === this.currentDate.getFullYear() &&
           this.selectedDate.getMonth() === this.currentDate.getMonth() &&
           this.selectedDate.getDate() === day;
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    // Poprzedni miesiąc
    const prevMonthDays = new Date(year, month, 0).getDate();
    const prevMonthStartDay = prevMonthDays - firstDay + 1;
    const prevMonthDaysArray = Array.from({ length: firstDay }, (_, i) => ({
      day: prevMonthStartDay + i,
      isCurrentMonth: false
    }));

    // Bieżący miesiąc
    const currentMonthDaysArray = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: true
    }));

    // Połącz dni z poprzedniego miesiąca i bieżącego
    this.days = [...prevMonthDaysArray, ...currentMonthDaysArray];

    // Dni z następnego miesiąca
    const totalDays = this.days.length;
    const remainingDays = 42 - totalDays;

    if (remainingDays > 0) {
      const nextMonthDaysArray = Array.from({ length: remainingDays }, (_, i) => ({
        day: i + 1,
        isCurrentMonth: false
      }));

      this.days = [...this.days, ...nextMonthDaysArray];
    }

    if (this.days[this.days.length - 1]!.day >= 7) {
      console.log(this.days[this.days.length - 1])
      this.days.splice(-7)

      if (this.days[this.days.length - 1]!.day >= 7 && this.days[this.days.length - 1]!.day < 20) {
        this.days.splice(-7)
      }
    }

    console.log(this.days)
  }


  toggleMonthSelection() {
    console.log('toggleMonthSelection')
    this.isMonthSelection = !this.isMonthSelection;
  }

  selectMonth(index: number) {
    this.currentDate = new Date(this.currentDate.getFullYear(), index, 1);
    this.isMonthSelection = false;
    this.generateCalendar();
  }
}
