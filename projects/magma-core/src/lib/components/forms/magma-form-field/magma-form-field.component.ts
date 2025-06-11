import { AfterViewInit, Component, ContentChild, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MagmaIconDirective } from '../../icon/magma-icon.directive';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MagmaDatePickerComponent } from '../../calendar/magma-date-picker/magma-date-picker.component';
import { MagmaAutocompleteComponent } from '../../autocomplete/magma-autocomplete/magma-autocomplete.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';


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
  
  @Input() months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  @Input() daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @ContentChild(MagmaIconDirective) magmaIcon?: MagmaIconDirective
  @ContentChild(NgControl) ngControl!: NgControl

  inputTypeStyle?: string
  step?: number = 1

  private inputClickListener?: () => void
  isDropdownDate: boolean = false
  typeCalendar?: string = 'day'
  @ViewChild(MagmaDatePickerComponent) magmaDatePickerComponent!: MagmaDatePickerComponent
  @ContentChild(MagmaAutocompleteComponent) magmaAutocompleteComponent!: MagmaAutocompleteComponent

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
      if (inputElement.getAttribute('inputTypeStyle') == 'date' || inputElement.getAttribute('inputTypeStyle') == 'dateRange') {
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
      // INSIDE INPUT TYPE DATE ------------------------------------------------- //
      if (inputElement.getAttribute('inputTypeStyle') == 'search') {
        this.inputTypeStyle = 'search'

        this.renderer.setStyle(inputElement, 'background-color', 'var(--magma-color-card-200)')
        this.renderer.setStyle(inputElement, 'height', '40px')
        this.renderer.setStyle(inputElement, 'max-height', '40px')
        this.renderer.setStyle(inputElement, 'border-radius', '8px')
        this.renderer.setStyle(inputElement, 'padding-left', '40px')
      }
      // INSIDE INPUT TYPE AUTOCOMPLETE ------------------------------------------------- //
      if (inputElement.getAttribute('inputTypeStyle') == 'autocomplete') {
        this.inputTypeStyle = 'autocomplete'

        if (inputElement) {
          this.inputClickListener = this.renderer.listen(inputElement, 'click', (event) => {
            // console.log('click input')
            // this.magmaAutocompleteComponent.openPanel()
            // console.log(this.ngControl.value)
            const nativeEl = this.magmaAutocompleteComponent.nativeElement

            // console.log(nativeEl.getAttribute('showOptionsOnClick') != null)

            if (nativeEl.getAttribute('showOptionsOnClick') != null) {
              this.magmaAutocompleteComponent.openPanel()
            }
            if (this.ngControl.value) {
              this.magmaAutocompleteComponent.openPanel()
            }
          });
        }
      }
    }
  }

  setDate?: Date
  
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

          // console.log(this.ngControl.value)
          // SET VALUE FROM INPUT TO DATEPICKER
          this.magmaDatePickerComponent.setDate = this.ngControl.value
          this.magmaDatePickerComponent.selectedDate = this.ngControl.value
          // ---------------------------------
  
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
    // INSIDE INPUT TYPE DATE ------------------------------------------------- //
    if (inputElement && inputElement.getAttribute('inputTypeStyle') == 'dateRange') {
      if (this.ngControl && this.ngControl.control) {

        // console.log(this.ngControl.value)
        let from = this.ngControl.value.from
        let to = this.ngControl.value.to

        this.magmaDatePickerComponent.isRangePicker = true
        this.magmaDatePickerComponent.rangeStart = from
        this.magmaDatePickerComponent.rangeEnd = to

        this.magmaDatePickerComponent.updateCalendar()

        // this.magmaDatePickerComponent.setDate = from
        // this.magmaDatePickerComponent.selectedDate = from


        // if (this.isValidDate(this.ngControl.value)) {

          // console.log(this.ngControl.value)
          // SET VALUE FROM INPUT TO DATEPICKER
          // this.magmaDatePickerComponent.setDate = this.ngControl.value
          // this.magmaDatePickerComponent.selectedDate = this.ngControl.value
          // // ---------------------------------
  
          // if (this.typeCalendar == 'day') {
          //   let date = this.convertDate(this.ngControl.value)
          //   this.ngControl.control.setValue(date)
          // }
          // if (this.typeCalendar == 'month') {
          //   let date = this.formatMonthYear(this.ngControl.value) 
          //   this.ngControl.control.setValue(date)
          // }
          // if (this.typeCalendar == 'year') {
          //   let date = this.convertDate(this.ngControl.value)
          //   this.ngControl.control.setValue(date)
          // }
        // }
      }
    }
    // SET VALUE FROM INPUT TO DATEPICKER
    if (this.ngControl?.control && this.magmaDatePickerComponent) {
      this.ngControl.control.valueChanges.subscribe((value) => {
        // SET VALUE FROM INPUT TO DATEPICKER
        if (inputElement.getAttribute('inputTypeStyle') != 'dateRange') {
          this.magmaDatePickerComponent.setDate = this.parseDateFromString(value)!
        }
        // this.magmaDatePickerComponent.selectedDate = value
        this.magmaDatePickerComponent.updateCalendar()
      });
    }
    // INSIDE INPUT TYPE AUTOCOMPLETE 
    if (inputElement && inputElement.getAttribute('inputTypeStyle') == 'autocomplete') {

      if (this.ngControl?.control && this.magmaAutocompleteComponent) {
        this.ngControl?.control.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
        .subscribe(value => {
          const height = inputElement.offsetHeight
          this.magmaAutocompleteComponent.inputHeight = `${height}px`
          this.magmaAutocompleteComponent?.search(value)
        });
      } 
    }
  }

  parseDateFromString(dateString: string): Date | null {
    const parts = dateString.split('/');

    let day = 1;
    let month = 0;
    let year: number;

    if (parts.length === 3) {
      // Format dd/MM/yyyy
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      year = parseInt(parts[2], 10);
    } else if (parts.length === 2) {
      // Format MM/yyyy
      month = parseInt(parts[0], 10) - 1;
      year = parseInt(parts[1], 10);
    } else if (parts.length === 1) {
      // Format yyyy
      year = parseInt(parts[0], 10);
    } else {
      return null;
    }

    const date = new Date(year, month, day);
    return !isNaN(date.getTime()) ? date : null;
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
    // console.log(event)
    const inputElement = this.el.nativeElement.querySelector('input')

    if (this.ngControl && this.ngControl.control) {

      if (inputElement.getAttribute('inputTypeStyle') == 'dateRange'){
        this.ngControl.control.setValue({
          from: new Date(event.from),
          to: new Date(event.to)
        });

        return
      }

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
