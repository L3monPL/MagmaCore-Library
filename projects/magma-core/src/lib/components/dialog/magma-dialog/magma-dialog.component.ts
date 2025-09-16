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

  isClickInsideAllowedArea(target: EventTarget | null): boolean {
    const dialogContent = this.dialogContentRef?.nativeElement;
    const overlayContainer = document.querySelector('.cdk-overlay-container');
    
    return (
      (dialogContent && dialogContent.contains(target)) ||
      (overlayContainer && overlayContainer.contains(target as Node))
    );
  }

  mouseDownOutside = false

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent) {
    this.mouseDownOutside = !this.isClickInsideAllowedArea(event.target);
  }

  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: MouseEvent) {
    const mouseUpOutside = !this.isClickInsideAllowedArea(event.target);

    if (this.mouseDownOutside && mouseUpOutside && this.isOpen) {
      this.close();
    }

    this.mouseDownOutside = false;
  }

  close() {
    this.closeDialog.emit()
  }
  
}
