import { AfterViewInit, Component, ContentChild, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MagmaIconDirective } from '../../icon/magma-icon.directive';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MagmaDatePickerComponent } from '../../calendar/magma-date-picker/magma-date-picker.component';


@Component({
  selector: 'magma-form-field',
  standalone: false,
  templateUrl: './magma-form-field.component.html',
  styleUrl: './magma-form-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagmaFormFieldComponent),
      multi: true,
    },
  ],
})
export class MagmaFormFieldComponent implements AfterViewInit, OnInit, OnDestroy{
  

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @ContentChild(MagmaIconDirective) magmaIcon?: MagmaIconDirective
  @ContentChild(NgControl) ngControl!: NgControl

  inputTypeStyle?: string
  step?: number = 1

  private inputClickListener?: () => void
  isDropdownDate: boolean = false
  typeCalendar?: string
  @ViewChild(MagmaDatePickerComponent) magmaDatePickerComponent!: MagmaDatePickerComponent

  ngOnInit(): void {
    const inputElement = this.el.nativeElement.querySelector('input')

    if (inputElement && inputElement.getAttribute('inputTypeStyle')) {
      // INSIDE INPUT TYPE NUMBER ------------------------------------------------- //
      if (inputElement.getAttribute('inputTypeStyle') == 'number') {
        this.inputTypeStyle = 'number'

        this.renderer.setStyle(inputElement, 'padding-left', '38px')
        this.renderer.setStyle(inputElement, 'padding-right', '38px')
      }
      // INSIDE INPUT TYPE NUMBER ------------------------------------------------- //
      if (inputElement.getAttribute('inputTypeStyle') == 'number-right') {
        this.inputTypeStyle = 'number-right'

        // this.renderer.setStyle(inputElement, 'padding-left', '38px')
        this.renderer.setStyle(inputElement, 'padding-right', '28px')
      }
      // INSIDE INPUT TYPE DATE ------------------------------------------------- //
      if (inputElement.getAttribute('inputTypeStyle') == 'date') {
        this.inputTypeStyle = 'date'

        if (inputElement.getAttribute('typeCalendar')) {
          this.typeCalendar = inputElement.getAttribute('typeCalendar')
        }

        if (inputElement) {
          this.inputClickListener = this.renderer.listen(inputElement, 'click', (event) => {
            this.magmaDatePickerComponent.openDropDown()
          });
        }
      }

    }
  }
  
  ngAfterViewInit(): void {
    const inputElement = this.el.nativeElement.querySelector('input')

    // INSIDE INPUT WITH ICON ------------------------------------------------- //
    const magmaIconElement = this.magmaIcon

    if (magmaIconElement && inputElement) {
      this.renderer.setStyle(inputElement, 'padding-left', '2rem')
    }

    // INSIDE INPUT TYPE DATE ------------------------------------------------- //
    if (inputElement && inputElement.getAttribute('inputTypeStyle') == 'date') {
      if (this.ngControl && this.ngControl.control) {
        if (this.isValidDate(this.ngControl.value)) {

          console.log(this.ngControl.value)

          this.magmaDatePickerComponent.selectedDate = this.ngControl.value
  
          if (this.typeCalendar == 'day') {
            let date = this.convertDate(this.ngControl.value)
            this.ngControl.control.setValue(date)
          }
          if (this.typeCalendar == 'month') {
            let date = this.formatMonthYear(this.ngControl.value)
            this.ngControl.control.setValue(date)
          }
          if (this.typeCalendar == 'year') {
            let date = this.convertDate(this.ngControl.value)
            this.ngControl.control.setValue(date)
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.inputClickListener) {
      this.inputClickListener();
    }
  }

  // -------------------------------------------------------------------------- //
  // INSIDE INPUT TYPE NUMBER ------------------------------------------------- //
  // -------------------------------------------------------------------------- //

  increaseValue() {
    const inputElement = this.el.nativeElement.querySelector('input')

    if (this.ngControl && this.ngControl.control) {
      const currentValue = Number(this.ngControl.control.value) || 0

      if (inputElement.getAttribute('step')) {
        let step = inputElement.getAttribute('step')

        let changedNumber: number = this.subtractWithPrecision(currentValue, step, '+')

        this.ngControl.control.setValue(changedNumber)
      }
      else{
        this.ngControl.control.setValue(currentValue + 1)
      }
    }
  }

  decreaseValue() {
    const inputElement = this.el.nativeElement.querySelector('input')

    if (this.ngControl && this.ngControl.control) {
      const currentValue = Number(this.ngControl.control.value) || 0

      if (inputElement.getAttribute('step')) {
        let step = inputElement.getAttribute('step')

        let changedNumber: number = this.subtractWithPrecision(currentValue, step, '-')

        this.ngControl.control.setValue(changedNumber)
      }
      else{
        this.ngControl.control.setValue(currentValue - 1)
      }
    }
  }

  subtractWithPrecision(value: number, step: number, operator: '+' | '-'): number {
    const decimals = Math.max(
      (value.toString().split('.')[1]?.length || 0),
      (step.toString().split('.')[1]?.length || 0)
    );
    const factor = Math.pow(10, decimals);
  
    const aInt = Math.round(value * factor);
    const bInt = Math.round(step * factor);
  
    const result = operator === '+'
      ? aInt + bInt
      : aInt - bInt;
  
    return result / factor;
  }

  // -------------------------------------------------------------------------- //
  // END END END -------------------------------------------------------------- //
  // -------------------------------------------------------------------------- //

  // -------------------------------------------------------------------------- //
  // INSIDE INPUT TYPE DATE --------------------------------------------------- //
  // -------------------------------------------------------------------------- //

  selectedDate(event: any){
    console.log(event)

    if (this.ngControl && this.ngControl.control) {

      if (this.typeCalendar == 'day') {
        let date = this.convertDate(event)
        this.ngControl.control.setValue(date)
      }
      if (this.typeCalendar == 'month') {
        let date = this.formatMonthYear(event)
        this.ngControl.control.setValue(date)
      }
      if (this.typeCalendar == 'year') {
        let date = this.convertDate(event)
        this.ngControl.control.setValue(date)
      }
    }
  }

  convertDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0'); // Dzień z zerem na początku
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Miesiące liczone od 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatMonthYear(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${year}`
  }

  isValidDate(dateStr: string): boolean {
    return !isNaN(Date.parse(dateStr));
  }

  // -------------------------------------------------------------------------- //
  // END END END -------------------------------------------------------------- //
  // -------------------------------------------------------------------------- //

}
