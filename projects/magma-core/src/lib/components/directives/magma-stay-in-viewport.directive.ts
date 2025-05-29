import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[magmaStayInViewport]',
  standalone: true
})
export class MagmaStayInViewportDirective implements AfterViewInit{

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement as HTMLElement;
    this.renderer.setStyle(element, 'visibility', 'hidden'); // Ukryj element

    setTimeout(() => {
      this.adjustPosition();
      this.renderer.setStyle(element, 'visibility', 'visible'); // Pokaż po ustawieniu pozycji
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustPosition();
  }

  private adjustPosition() {
    const element = this.el.nativeElement as HTMLElement;
    const rect = element.getBoundingClientRect();
    const margin = 8;
  
    const stylesToUpdate: { [key: string]: string | null } = {
      left: null,
      right: null,
      top: null,
      bottom: null,
    };
  
    if (rect.right > window.innerWidth) {
      stylesToUpdate['right'] = `${margin}px`;
      stylesToUpdate['left'] = 'auto';
    }
  
    if (rect.left < 0) {
      stylesToUpdate['left'] = `${margin}px`;
      stylesToUpdate['right'] = 'auto';
    }
  
    if (rect.bottom > window.innerHeight) {
      stylesToUpdate['bottom'] = `${margin}px`;
      stylesToUpdate['top'] = 'auto';
    }
  
    if (rect.top < 0) {
      stylesToUpdate['top'] = `${margin}px`;
      stylesToUpdate['bottom'] = 'auto';
    }
  
    for (const [key, value] of Object.entries(stylesToUpdate)) {
      if (value !== null) {
        this.renderer.setStyle(element, key, value);
      }
    }
  }

}
