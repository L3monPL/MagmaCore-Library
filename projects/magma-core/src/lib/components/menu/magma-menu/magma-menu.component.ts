import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'magma-menu',
  standalone: false,
  templateUrl: './magma-menu.component.html',
  styleUrl: './magma-menu.component.scss'
})
export class MagmaMenuComponent {

  @Input() isOpen: boolean = true

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.addStyles()
  }
  
  private addStyles() {
    const element = this.el.nativeElement;
  
    this.renderer.setStyle(element, 'margin-top', '6px')
  }

  toggle(event: Event) {
    this.isOpen = !this.isOpen
  }
}
