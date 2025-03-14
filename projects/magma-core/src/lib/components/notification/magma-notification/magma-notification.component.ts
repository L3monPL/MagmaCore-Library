import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationType } from '../magma-notification.service';

@Component({
  selector: 'magma-notification',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './magma-notification.component.html',
  styleUrl: './magma-notification.component.scss'
})
export class MagmaNotificationComponent implements OnInit{

  @Input() message: string = '';
  @Input() type: NotificationType = 'INFO'
  @Input() duration: number = 3000;
  @Input() zIndex: number = 1000;
  show: boolean = true

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      // Zamknięcie powiadomienia po określonym czasie
      this.closeNotification();
    }, this.duration);
  }

  closeNotification(): void {
    // Logika zamknięcia powiadomienia
  }
}
