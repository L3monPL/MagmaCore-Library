import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'magma-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './magma-dialog.component.html',
  styleUrl: './magma-dialog.component.scss'
})
export class MagmaDialogComponent implements AfterViewInit, OnDestroy{

  @Input() data: any;
  @Input() position = 'center'
  isOpen = false

  @Output() closeDialog = new EventEmitter<any>()

  constructor(private el: ElementRef) {}

  ngOnDestroy(): void {
    this.isOpen = false
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
        this.isOpen = true
    }, 0);
  }

  @ViewChild('dialogContent') dialogContentRef!: ElementRef

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideContent = this.dialogContentRef?.nativeElement.contains(event.target);
    
    if (!clickedInsideContent && this.isOpen) {
      this.close();
    }
  }

  close() {
    this.closeDialog.emit()
  }
  
}
