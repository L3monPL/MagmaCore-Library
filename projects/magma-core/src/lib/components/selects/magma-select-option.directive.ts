import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[magmaSelectOption]',
  standalone: false
})
export class MagmaSelectOptionDirective {

  @Output() optionSelected = new EventEmitter<any>();

  @Input() value: any;  // Zmienna do przechowywania wartości opcji (z atrybutu 'value' lub innej)

  constructor(private el: ElementRef, private renderer: Renderer2) {

    this.renderer.listen(this.el.nativeElement, 'click', () => {
      const valueToEmit = this.value !== undefined ? this.value : this.el.nativeElement.innerText
      this.optionSelected.emit(valueToEmit)
    });
  }

}
