import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { ProgressSpinnerModule } from '../../progressSpinner/progress-spinner.module';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'magma-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  templateUrl: './magma-dialog.component.html',
  styleUrl: './magma-dialog.component.scss',
})
export class MagmaDialogComponent implements AfterViewInit, OnDestroy{

  @Input() data: any;
  @Input() position = 'center'
  @Input() loading = false

  @Output() closeDialog = new EventEmitter<any>()

  isOpen = false

  constructor(private el: ElementRef) {}

  ngOnDestroy(): void {
    this.isOpen = false
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
        this.isOpen = true
        console.log(this.loading)
    }, 0);
  }

  @ViewChild('dialogContent') dialogContentRef!: ElementRef

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent) {
  //   const clickedInsideContent = this.dialogContentRef?.nativeElement.contains(event.target);
    
  //   if (!clickedInsideContent && this.isOpen) {
  //     this.close();
  //   }
  // }

  mouseDownOutside = false

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent) {
    const clickedInside = this.dialogContentRef?.nativeElement.contains(event.target);
    this.mouseDownOutside = !clickedInside;
  }

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: MouseEvent) {
    const clickedInside = this.dialogContentRef?.nativeElement.contains(event.target);
    const mouseUpOutside = !clickedInside;

    if (this.mouseDownOutside && mouseUpOutside && this.isOpen) {
      this.close();
    }

    this.mouseDownOutside = false; // Reset flag
  }

  close() {
    this.closeDialog.emit()
  }
  
}
