import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'magma-autocomplete',
  standalone: false,
  templateUrl: './magma-autocomplete.component.html',
  styleUrl: './magma-autocomplete.component.scss'
})
export class MagmaAutocompleteComponent {

  @Input() isOpen: boolean = false
  @Output() searchEmitter = new EventEmitter()

  openPanel(){
    this.isOpen = true
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
    // console.log(inputValue)
    this.searchEmitter.emit(inputValue)
  }
}
