import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[magmaIcon]',
  standalone: false
})
export class MagmaIconDirective implements AfterViewInit{

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.checkInsideMagmaFormField()
  }

  checkInsideMagmaFormField(){
    const parentFormField = this.el.nativeElement.closest('magma-form-field');
    const parentMagmaSidenavItem = this.el.nativeElement.closest('magma-sidenav-item')

    if (parentFormField) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute')
      this.renderer.setStyle(this.el.nativeElement, 'bottom', '9px')
      this.renderer.setStyle(this.el.nativeElement, 'left', '10px')
      this.renderer.setStyle(this.el.nativeElement, 'fill', '#fff')
      this.renderer.setStyle(this.el.nativeElement, 'width', '14')
      this.renderer.setStyle(this.el.nativeElement, 'height', '14') 
    } 
    if (parentMagmaSidenavItem) {
      this.renderer.setStyle(this.el.nativeElement, 'width', '22')
      this.renderer.setStyle(this.el.nativeElement, 'height', '22') 
      this.renderer.setStyle(this.el.nativeElement, 'fill', '#6366f1')
    }
  }

}
