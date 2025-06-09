import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'magma-chip-content',
  standalone: false,
  templateUrl: './magma-chip-content.component.html',
  styleUrl: './magma-chip-content.component.scss'
})
export class MagmaChipContentComponent {

  @Input() value?: string = ''
  @Input() selected?: any = ''
  @Input()removable: boolean = true

  @Output() selectedChange = new EventEmitter<any>()
  @Output() clearData = new EventEmitter<any>()

  constructor(
    public elementRef: ElementRef
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement
  }

  cancleSelect(){
    this.selected = null
    this.selectedChange.emit(this.selected)
    this.clearData.emit('clearData')
  }

}
