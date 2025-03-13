import { AfterViewInit, Component, ContentChild, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MagmaIconDirective } from '../../icon/magma-icon.directive';
import { NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';
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

    if (inputElement.getAttribute('inputTypeStyle')) {
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
    const magmaIconElement = this.magmaIcon
    const inputElement = this.el.nativeElement.querySelector('input')

    if (magmaIconElement && inputElement) {
      this.renderer.setStyle(inputElement, 'padding-left', '2rem')
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

}
