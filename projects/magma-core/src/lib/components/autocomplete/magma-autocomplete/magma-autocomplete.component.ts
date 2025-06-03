import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'magma-autocomplete',
  standalone: false,
  templateUrl: './magma-autocomplete.component.html',
  styleUrl: './magma-autocomplete.component.scss'
})
export class MagmaAutocompleteComponent{

  @Input() isOpen: boolean = false
  @Input() list: Array<any> = []
  @Input() loading: boolean = true
  @Input() inputHeight: string = '32px'
  @Input() inputElement?: HTMLElement

  @Output() searchEmitter = new EventEmitter()

  @ViewChild('magmaAutocomplete', { static: false }) autocompleteContainerRef?: ElementRef

  isAutocompleteSelectItem = false

  autocompleteSelectItem(){
    this.isAutocompleteSelectItem = true
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  openPanel(){
    if (this.isAutocompleteSelectItem) {
      this.isAutocompleteSelectItem = false
      this.closePanel()
      return
    }

    this.isOpen = true

    setTimeout(() => {
      this.adjustPosition();
    });
  }

  closePanel(){
    this.isOpen = false
  }

  search(inputValue: any){

    if (inputValue) {
      this.openPanel()
    }
    else{
      this.closePanel()
    }
    this.searchEmitter.emit(inputValue)
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustPosition();
  }
  
  private adjustPosition() {
    const element = this.autocompleteContainerRef?.nativeElement as HTMLElement;
    if (!element) return
    const rect = element.getBoundingClientRect();
    const margin = 8;
    
    const stylesToUpdate: { [key: string]: string | null } = {
      left: null,
      right: null,
      top: null,
      bottom: null,
      visibility: 'visible'
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
      stylesToUpdate['bottom'] = this.inputHeight;
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideMenu = this.el.nativeElement.contains(event.target);
    const clickedInput = this.inputElement?.contains(event.target as Node);

    if (!clickedInsideMenu && !clickedInput && this.isOpen) {
      this.isOpen = false
    }
  }

}


