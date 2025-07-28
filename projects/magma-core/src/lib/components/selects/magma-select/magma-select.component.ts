import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, forwardRef, HostListener, Input, QueryList, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MagmaSelectListComponent } from '../magma-select-list/magma-select-list.component';
import { MagmaSelectOptionDirective } from '../magma-select-option.directive';

@Component({
  selector: 'magma-select',
  standalone: false,
  templateUrl: './magma-select.component.html',
  styleUrl: './magma-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagmaSelectComponent),
      multi: true,
    },
  ],
})
export class MagmaSelectComponent implements ControlValueAccessor, AfterContentInit{

  @ContentChild(MagmaSelectListComponent) selectList!: MagmaSelectListComponent

  @Input() optionLabel?: string = ''

  dropdownOpen = false

  value: any = {}

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  ngAfterContentInit() {
    if (this.selectList) {
      this.selectList.optionSelected.subscribe((value: any) => {

        if (this.optionLabel) {
          this.value = value[this.optionLabel]
          this.onChange(this.value)
        }
        else{
          this.value = value
          this.onChange(this.value)
        }
        this.onTouched()
        this.dropdownOpen = false
      });
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen
  }

  @ViewChild('selectInput') private selectInput!: ElementRef

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    
    if (!this.selectInput.nativeElement.contains(event.target) && this.dropdownOpen) {
      this.dropdownOpen = false
    }
  }

}
