import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

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

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
  ) { }

  ngAfterContentInit(): void{
    this.checkScreenSize()
  }

  ngAfterViewInit(): void {
    this.checkMode()
    this.checkOpened()
  }

  isFirstTimeCheckChanges = true

  ngOnChanges(changes: SimpleChanges) {
    if (changes['opened']) {
      if (!this.isFirstTimeCheckChanges) {
        console.log(this.opened)
        this.opened = !this.opened
        this.checkOpened()
      }
      this.isFirstTimeCheckChanges = false
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize()
  }

  isLargeScreen?: boolean

  checkScreenSize(){
    const width = window.innerWidth;
    this.isLargeScreen = width >= 800;
    console.log('Current width:', width, 'isLargeScreen:', this.isLargeScreen)

    if (this.isLargeScreen) {
      if (this.mode != 'side') {
        this.mode = 'side'
        this.checkMode()
      }
    }
    else{
      if (this.mode != 'over') {
        this.mode = 'over'
        this.checkMode()
      }
    }
  }

  checkMode(){
    if (this.mode == 'side') {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative')
      this.opened = true
    }
    if (this.mode == 'over') {
      this.opened = false
      this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute')
      this.renderer.setStyle(this.el.nativeElement, 'top', '0')
      this.renderer.setStyle(this.el.nativeElement, 'bottom', '0')
      this.renderer.setStyle(this.el.nativeElement, 'left', '0')

      if (!this.isLargeScreen) {
        // this.renderer.setStyle(this.el.nativeElement, 'right', '0')
      }
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
