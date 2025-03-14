import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

export type NotificationType = 'SUCCES' | 'ERROR' | 'INFO' | 'WARNING'

@Injectable({
  providedIn: 'root'
})
export class MagmaNotificationService {

  private notificationContainer: HTMLElement | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  private createNotificationContainer(): HTMLElement {
    if (!this.notificationContainer) {
      this.notificationContainer = document.createElement('div');
      this.notificationContainer.classList.add('magma-notification-container');
      document.body.appendChild(this.notificationContainer);
    }
    return this.notificationContainer;
  }

  showNotification<T>(component: Type<T>, data?: Partial<T & { message: string; type: NotificationType}>, duration: number = 3000): void {
    this.createNotificationContainer();

    // Tworzymy fabrykę komponentu powiadomienia
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);

    // Rzutowanie na typ komponentu i przypisanie danych
    if (data) {
      Object.assign(componentRef.instance!, data);
    }

    // Dodajemy komponent do aplikacji
    this.appRef.attachView(componentRef.hostView);

    // Dodajemy komponent do kontenera powiadomień (jedno pod drugim)
    this.notificationContainer!.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);

    // Zamykamy powiadomienie po czasie
    setTimeout(() => {
      this.closeNotification(componentRef);
    }, duration);
  }

  closeNotification(componentRef: any): void {
    if (componentRef.hostView) {
      this.appRef.detachView(componentRef.hostView);
      this.notificationContainer?.removeChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);
    }

    // Usuwamy kontener, jeśli nie ma już powiadomień
    if (this.notificationContainer && this.notificationContainer.childNodes.length === 0) {
      document.body.removeChild(this.notificationContainer);
      this.notificationContainer = null;
    }
  }
}
