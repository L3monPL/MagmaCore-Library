import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[magmaButton]',
  standalone: false
})
export class MagmaButtonDirective implements OnInit{ 

  @Input() size?: string
  @Input() color?: string

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.addStyles()
  }

  ngOnInit(): void {
    const button = this.el.nativeElement

    if (this.size) {
      switch (this.size) {
        case 's':
          this.renderer.setStyle(button, 'height', `24px`)
          break;
        case 'm':
          this.renderer.setStyle(button, 'height', `32px`)
          break;
          case 'l':
          this.renderer.setStyle(button, 'height', `36px`)
          break;
        case 'xl':
          this.renderer.setStyle(button, 'height', `40px`)
          break;
      
        default:
          this.renderer.setStyle(button, 'height', `${this.size}px`)
          break;
      }
    }
    else{
      this.renderer.setStyle(button, 'height', `24px`)
    }

    if (this.color) {
      switch (this.color) {
        case 'green':
          this.renderer.setStyle(button, 'background-color', `var(--magma-color-green-100)`)
          break;
        case 'red':
          this.renderer.setStyle(button, 'background-color', `var(--magma-color-red-100)`)
          break;
        case 'blue':
          this.renderer.setStyle(button, 'background-color', `var(--magma-color-blue-100)`)
          break;
        case 'yellow':
          this.renderer.setStyle(button, 'background-color', `var(--magma-color-yellow-100)`)
          break;
        case 'purple':
          this.renderer.setStyle(button, 'background-color', `var(--magma-color-purple-100)`)
          break;
      
        default:
          this.renderer.setStyle(button, 'background-color', `${this.color}`)
          break;
      }
    }
    else{
      this.renderer.setStyle(button, 'background-color', `#4a4b57`)
    }
  }

  addStyles() {
    const button = this.el.nativeElement;

    this.renderer.addClass(button, 'magma-button')
    this.renderer.setStyle(button, 'cursor', 'pointer')
    this.renderer.setStyle(button, 'border', 'none')
    this.renderer.setStyle(button, 'padding', '0.4rem 0.75rem')
    this.renderer.setStyle(button, 'font-size', '0.8rem')
    this.renderer.setStyle(button, 'background-color', '#4a4b57')
    this.renderer.setStyle(button, 'color', '#fff')
    this.renderer.setStyle(button, 'font-weight', '600')
    // this.renderer.setStyle(button, 'display', 'flex')
  }


}
