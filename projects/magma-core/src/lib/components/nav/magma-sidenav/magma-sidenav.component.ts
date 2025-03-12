import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

@Component({
  selector: 'magma-sidenav',
  standalone: false,
  templateUrl: './magma-sidenav.component.html',
  styleUrl: './magma-sidenav.component.scss',
  animations: [
    trigger('openClose', [
      // Początkowy stan (ukryty, zero szerokości)
      state('void', style({ 
        width: '0px',
        transform: 'translateX(-100%)',
        opacity: 0 
      })), 

      // Końcowy stan (pełna szerokość, widoczny)
      state('*', style({ 
        width: '240px',
        transform: 'translateX(0)',
        opacity: 1,
      })),

      // Animacja otwierania (najpierw szerokość, potem przesuwanie)
      transition('void => *', [
        animate('300ms ease-out', style({ 
          width: '240px',
          transform: 'translateX(0)',
          opacity: 1 
        })) 
      ]),

      // Animacja zamykania (najpierw przesuwanie, potem zwężanie)
      transition('* => void', [
        animate('200ms ease-in', style({ 
          width: '0px',
          transform: 'translateX(-100%)',
          opacity: 0 
        })) 
      ])
    ])
    // trigger('openClose', [
    //   state('void', style({ transform: 'translateX(-100%)', opacity: 0 })),
    //   state('*', style({ transform: 'translateX(0)', opacity: 1 })),
    //   transition('void <=> *', animate('300ms ease-in-out'))
    // ])
  ]
})
export class MagmaSidenavComponent implements AfterViewInit, OnChanges {

  @Input() mode?: string = 'side'
  @Input() opened?: boolean = true
  @Output() openedChange = new EventEmitter<boolean>()

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.checkMode()
    this.checkOpened()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['opened']) {
      this.opened = changes['opened'].currentValue
      this.checkOpened()
    }
  }

  checkMode(){
    if (this.mode == 'side') {
      
    }
    if (this.mode == 'over') {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute')

      this.renderer.setStyle(this.el.nativeElement, 'top', '0')
      this.renderer.setStyle(this.el.nativeElement, 'bottom', '0')
      this.renderer.setStyle(this.el.nativeElement, 'left', '0')
    }
  }

  checkOpened(){
    if (this.opened) {
      // this.renderer.setStyle(this.el.nativeElement, 'display', 'flex')
    }
    if (!this.opened) {
      // this.renderer.setStyle(this.el.nativeElement, 'display', 'none')
    }
  }


}
