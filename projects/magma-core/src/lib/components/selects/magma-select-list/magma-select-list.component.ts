import { AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core';
import { MagmaSelectOptionDirective } from '../magma-select-option.directive';

@Component({
  selector: 'magma-select-list',
  standalone: false,
  templateUrl: './magma-select-list.component.html',
  styleUrl: './magma-select-list.component.scss'
})
export class MagmaSelectListComponent implements AfterContentInit{

  @ContentChildren(MagmaSelectOptionDirective) selectOptionDirective!: QueryList<MagmaSelectOptionDirective>

  @Output() optionSelected = new EventEmitter<any>()

  ngAfterContentInit() {
    if (this.selectOptionDirective) {
      this.selectOptionDirective.toArray().forEach(option => {
        option.optionSelected.subscribe((value: any) => {
          this.optionSelected.emit(value)
          console.log(value)
        });
      });
    }
  }
}
