import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

@Component({
  selector: 'magma-sidenav',
  standalone: false,
  templateUrl: './magma-sidenav.component.html',
  styleUrl: './magma-sidenav.component.scss',
  animations: [
    trigger('openClose', [
      state('false', style({ 
        width: '0px', 
      })),
      state('true', style({ 
        width: '250px', 
      })),
      transition('false => true', group([
        animate('300ms ease-in-out', style({ width: '250px' }))
      ])),
      transition('true => false', group([
        animate('300ms ease-in-out', style({ width: '0px' }))
      ]))
    ]),
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
