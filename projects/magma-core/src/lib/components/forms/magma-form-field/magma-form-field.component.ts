import { AfterViewInit, Component, ContentChild, ElementRef, forwardRef, Input, OnInit, Renderer2 } from '@angular/core';
import { MagmaIconDirective } from '../../icon/magma-icon.directive';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

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
export class MagmaFormFieldComponent implements AfterViewInit, OnInit{

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @ContentChild(MagmaIconDirective) magmaIcon?: MagmaIconDirective
  @ContentChild(NgModel) ngModel!: NgModel

  inputType?: string

  ngOnInit(): void {
    const inputElement = this.el.nativeElement.querySelector('input')

    if (inputElement.getAttribute('inputType')) {
      if (inputElement.getAttribute('inputType') == 'number') {
        this.inputType = 'number'

        this.renderer.setStyle(inputElement, 'padding-left', '38px')
        this.renderer.setStyle(inputElement, 'padding-right', '38px')

        inputElement.addEventListener('input', this.validateNumberInput.bind(this))
      }
    }
  }
  
  ngAfterViewInit(): void {
    const magmaIconElement = this.magmaIcon
    const inputElement = this.el.nativeElement.querySelector('input')

    if (magmaIconElement && inputElement) {
      // this.renderer.addClass(inputElement, 'with-icon')
      this.renderer.setStyle(inputElement, 'padding-left', '2rem')

      // this.renderer.setStyle(magmaIconElement, 'position', 'absolute')
      // this.renderer.setStyle(magmaIconElement, 'bottom', '9px')
      // this.renderer.setStyle(magmaIconElement, 'left', '10px')
      // this.renderer.setStyle(magmaIconElement, 'fill', '#fff')

      // this.renderer.setStyle(magmaIconElement, 'width', '14')
      // this.renderer.setStyle(magmaIconElement, 'height', '14')
    }
  }

  increaseValue() {
    if (this.ngModel) {
      this.ngModel.control.setValue(Number(this.ngModel.value) + 1)
    }
  }

  decreaseValue() {
    if (this.ngModel) {
      this.ngModel.control.setValue(Number(this.ngModel.value) - 1)
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

}
