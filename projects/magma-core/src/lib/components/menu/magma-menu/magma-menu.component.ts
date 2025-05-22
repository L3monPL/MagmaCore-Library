import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'magma-menu',
  standalone: false,
  templateUrl: './magma-menu.component.html',
  styleUrl: './magma-menu.component.scss'
})
export class MagmaMenuComponent{

  @Input() isOpen: boolean = true
  @Input() toggleButtonElement?: HTMLElement

  @Output() changeValue = new EventEmitter<any>()

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.addStyles()
  }
  
  private addStyles() {
    const element = this.el.nativeElement
  
    this.renderer.setStyle(element, 'margin-top', '6px')
  }

  toggle(event: Event) {
    this.isOpen = !this.isOpen
    console.log(this.isOpen)
  }

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const magmaSelect = target.closest('[magmaSelect]');

    if (magmaSelect) {
      const value = magmaSelect.getAttribute('value');
      if (value) {
        this.changeValue.emit(value)
      }
      this.isOpen = false
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideMenu = this.el.nativeElement.contains(event.target);
    const clickedToggle = this.toggleButtonElement?.contains(event.target as Node);

    // Zamykaj tylko gdy kliknięcie jest poza menu i poza przyciskiem toggle
    if (!clickedInsideMenu && !clickedToggle && this.isOpen) {
      this.isOpen = false;
    }
  }
}
