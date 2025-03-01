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
      this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day) 
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
    // const year = this.currentDate.getFullYear();
    // const month = this.currentDate.getMonth();
    // const daysInMonth = new Date(year, month + 1, 0).getDate();
    // const firstDay = new Date(year, month, 1).getDay(); // Dzień tygodnia pierwszego dnia miesiąca

    // // Generowanie tablicy z dniami miesiąca
    // this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // // Dodanie pustych dni na początku miesiąca, jeśli pierwszy dzień miesiąca nie jest niedzielą
    // const paddingDaysBefore = firstDay; // Ilość pustych dni na początku
    // const paddingDaysAfter = 42 - (this.days.length + paddingDaysBefore); // 42 = 6 tygodni x 7 dni

    // // Dni z poprzedniego miesiąca
    // const prevMonthDays = new Date(year, month, 0).getDate(); // Liczba dni w poprzednim miesiącu
    // const prevMonthStartDay = prevMonthDays - paddingDaysBefore + 1; // Ostatni dzień przed miesiącem

    // // Dni z następnego miesiąca
    // const nextMonthStartDay = 1;

    // // Generowanie dni z poprzedniego miesiąca
    // const prevMonthDaysArray = Array.from(
    //   { length: paddingDaysBefore },
    //   (_, i) => prevMonthStartDay + i
    // );

    // // Generowanie dni z następnego miesiąca
    // const nextMonthDaysArray = Array.from(
    //   { length: paddingDaysAfter },
    //   (_, i) => nextMonthStartDay + i
    // );

    // // Łączenie dni z bieżącego miesiąca, poprzedniego i następnego
    // this.days = [
    //   ...prevMonthDaysArray, 
    //   ...this.days, 
    //   ...nextMonthDaysArray
    // ]

    if (this.days[this.days.length - 1]!.day >= 7) {
      console.log(this.days[this.days.length - 1])
      this.days.splice(-7)
    }

    console.log(this.days)
  }

  checkLastWeek(){

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
