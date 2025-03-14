import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'magma-date-picker',
  standalone: false,
  templateUrl: './magma-date-picker.component.html',
  styleUrl: './magma-date-picker.component.scss'
})
export class MagmaDatePickerComponent {

  @Input() dropdown = false
  @Output() selectDateEmmiter = new EventEmitter<any>()

  currentDate = new Date()
  selectedDate: Date | null = null

  days: Array<{ day: number, isCurrentMonth: boolean }> = []
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  years?: Array<number> = []
  currentSelection?: string = 'day'

  constructor(
    private el: ElementRef, 
  ) {
    this.generateCalendar()
  }


  changeArrow(offset: number) {
    if (this.currentSelection == 'day') {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + offset, 1)
      this.generateCalendar() 
    }
    if (this.currentSelection == 'month') {
      this.currentDate = new Date(this.currentDate.getFullYear() + offset, this.currentDate.getMonth(), 1)
    }
    if (this.currentSelection == 'year') {
      this.currentDate = new Date(this.currentDate.getFullYear() + (offset * 7), this.currentDate.getMonth(), 1)
      this.years = this.getYearRange(String(this.currentDate))
    }
  }

  selectDate(day: number, isCurrentMonth: boolean) {
    if (day !== null && isCurrentMonth) {
      let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
      this.selectedDate = date
      // console.log(this.selectedDate)
      this.selectDateEmmiter.emit(this.selectedDate)

      setTimeout(() => {
        this.dropdown = false
      }, 300);
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
    let firstDay = new Date(year, month, 1).getDay();
    // firstDay = (firstDay === 0) ? 6 : firstDay - 1

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
    if (this.currentSelection == 'month') {
      this.currentSelection = 'day'
      return
    }
    this.currentSelection = 'month'
  }

  selectMonth(index: number) {
    this.currentDate = new Date(this.currentDate.getFullYear(), index, 1);
    this.currentSelection = 'day'
    this.generateCalendar();
  }

  toggleYearSelection(){
    this.currentSelection = 'year'

    this.years = this.getYearRange(String(this.currentDate))

    console.log(this.years)
  }

  selectYear(year: number) {
    this.currentDate = new Date(year, this.currentDate.getMonth(), 1);
    this.currentSelection = 'month'
  }

  getYearRange(date: string): number[] {
    const year = new Date(date).getFullYear();
    const years = [];
  
    for (let i = -7; i <= 7; i++) {
      years.push(year + i);
    }
    return years
  }

  @ViewChild('dropdownPicker') dropdownPicker!: ElementRef
  @HostListener('document:click', ['$event'])
  showDropdown(event: MouseEvent){

    if (!this.dropdown) {
      return
    }
    if (this.el.nativeElement.closest('.form-field').contains(event.target)) {
      return
    }
    if (!this.dropdownPicker.nativeElement.contains(event.target) && this.dropdown) {
      this.dropdown = false
    }
  }

  dropDownRight?: string = 'auto'
  dropDownLeft?: string = '0px'
  dropDownBottom?: string = 'auto'

  openDropDown(){

    const inputRect = this.el.nativeElement.closest('.form-field').getBoundingClientRect()
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    //RIGHT LEFT
    if (windowWidth - inputRect.x < 272) {
      console.log(windowWidth - inputRect.x)
      this.dropDownRight = '0px'
      this.dropDownLeft = 'auto'
    }
    else{
      this.dropDownRight = 'auto'
      this.dropDownLeft = '0px'
    }
    //TOP BOTTOM
    // if (windowHeight - inputRect.y < (290 + inputRect.y + 4)) {
    //   this.dropDownBottom = `${inputRect.y}px`
    //   if (windowHeight < (290 + inputRect.y + 4)) {
    //     this.dropDownBottom = 'auto'
    //   }
    // }
    // else{
    //   this.dropDownBottom = 'auto'
    // }
    if ((windowHeight - (inputRect.y + inputRect.height + 290 + 4)) <= 0) {
      this.dropDownBottom = `${inputRect.height}px`
    }
    else{
      this.dropDownBottom = 'auto'
    }
    this.dropdown = true
  }

  getStyles() {
    return {
      right: this.dropDownRight,
      left: this.dropDownLeft,
      bottom: this.dropDownBottom
    };
  }
}
