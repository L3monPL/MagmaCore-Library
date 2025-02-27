import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[magmaInput]',
  standalone: false
})
export class MagmaInputDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.addStyles()
  }

  private addStyles() {
    const button = this.el.nativeElement;

    this.renderer.addClass(button, 'magma-input');
    // this.renderer.setStyle(button, 'cursor', 'pointer');
    // this.renderer.setStyle(button, 'border', 'none');
    // this.renderer.setStyle(button, 'padding', '0.4rem 0.75rem');
    // this.renderer.setStyle(button, 'font-size', '0.8rem');
    // this.renderer.setStyle(button, 'background-color', '#4a4b57');
    // this.renderer.setStyle(button, 'color', '#fff');
    // this.renderer.setStyle(button, 'font-weight', '600');
    // this.renderer.setStyle(button, 'transition', 'background-color 0.3s ease');
  }

}
