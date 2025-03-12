import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'progress-spinner',
  standalone: false,
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({ opacity: '0'}),
        animate('0.4s',
          style({ opacity: '1'}))
      ])
    ])
  ]
})
export class ProgressSpinnerComponent {

  @Input() size?: number = 30

  // constructor(private el: ElementRef, private renderer: Renderer2) {
  //     this.addStyles()
  //   }
  
  //   private addStyles() {
  //     const spinner = this.el.nativeElement;

  //     this.renderer.setStyle(spinner, 'width', `${this.size}px`);
  //     this.renderer.setStyle(spinner, 'height', `${this.size}px`);
  //   }

  getStyles() {
    return {
      width: this.size + 'px',
      height: this.size + 'px',
    };
  }


}
