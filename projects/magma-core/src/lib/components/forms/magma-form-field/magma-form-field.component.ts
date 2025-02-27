import { AfterViewInit, Component, ContentChild, ElementRef, Renderer2 } from '@angular/core';
import { MagmaIconDirective } from '../../icon/magma-icon.directive';

@Component({
  selector: 'magma-form-field',
  standalone: false,
  templateUrl: './magma-form-field.component.html',
  styleUrl: './magma-form-field.component.scss'
})
export class MagmaFormFieldComponent implements AfterViewInit{

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @ContentChild(MagmaIconDirective) magmaIcon?: MagmaIconDirective
  
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

}
