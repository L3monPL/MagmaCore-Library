import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[magmaTextarea]',
  standalone: false
})
export class MagmaTextareaDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
      this.addStyles()
    }
  
    private addStyles() {
      const button = this.el.nativeElement;
  
      this.renderer.addClass(button, 'magma-textarea');
    }

}
