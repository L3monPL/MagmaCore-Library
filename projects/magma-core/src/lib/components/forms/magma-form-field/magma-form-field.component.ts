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

  private inputClickListener?: () => void
  isDropdownDate: boolean = false
  @ViewChild(MagmaDatePickerComponent) magmaDatePickerComponent!: MagmaDatePickerComponent

  ngOnInit(): void {
    const inputElement = this.el.nativeElement.querySelector('input')

    if (inputElement && inputElement.getAttribute('inputTypeStyle')) {
      // INSIDE INPUT TYPE NUMBER ------------------------------------------------- //
      if (inputElement.getAttribute('inputTypeStyle') == 'number') {
        this.inputTypeStyle = 'number'

        this.renderer.setStyle(inputElement, 'padding-left', '38px')
        this.renderer.setStyle(inputElement, 'padding-right', '38px')

        inputElement.addEventListener('input', this.validateNumberInput.bind(this))
      }
      // INSIDE INPUT TYPE DATE ------------------------------------------------- //
      if (inputElement.getAttribute('inputTypeStyle') == 'date') {
        this.inputTypeStyle = 'date'

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
  
          let date = this.convertDate(this.ngControl.value)
  
          this.ngControl.control.setValue(date)
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
    if (this.ngControl && this.ngControl.control) {
      const currentValue = Number(this.ngControl.control.value) || 0
      this.ngControl.control.setValue(currentValue + 1)
    }
  }

  decreaseValue() {
    if (this.ngControl && this.ngControl.control) {
      const currentValue = Number(this.ngControl.control.value) || 0
      this.ngControl.control.setValue(currentValue - 1)
    }
  }

  validateNumberInput(event: Event): void {
    //   inputElement.setCustomValidity('Proszę wprowadzić tylko liczbę');
    //   inputElement.reportValidity(); // Pokazuje walidację

    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    value = value.replace(/,/g, '.');
    value = value.replace(/[^0-9.\-]/g, '');

    if (value.indexOf('-') > 0) {
      value = value.replace(/-/g, '');
    }

    if (value.split('.').length > 2) {
      value = value.slice(0, value.lastIndexOf('.'));
    }

    inputElement.value = value;
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

      let date = this.convertDate(event)

      this.ngControl.control.setValue(date)
    }
  }

  convertDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0'); // Dzień z zerem na początku
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Miesiące liczone od 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  isValidDate(dateStr: string): boolean {
    return !isNaN(Date.parse(dateStr));
  }

  // -------------------------------------------------------------------------- //
  // END END END -------------------------------------------------------------- //
  // -------------------------------------------------------------------------- //

}
