import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';

export interface DialogComponentInterface {
  data: any;
  closeDialog: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class MagmaDialogService {

  private dialogContainer: HTMLElement | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  private createDialogContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('dialog-container');
    document.body.appendChild(container);
    return container;
  }

  openDialog(component: any, data: any): void {
    // Tworzymy kontener na dialog
    if (!this.dialogContainer) {
      this.dialogContainer = this.createDialogContainer();
    }

    // Tworzymy fabrykę komponentu
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);

    // Przekazujemy dane do komponentu
    (componentRef.instance as DialogComponentInterface).data = data;

    // Dodajemy komponent do aplikacji
    this.appRef.attachView(componentRef.hostView);

    // Dodajemy komponent do kontenera
    this.dialogContainer.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);

    // Dodajemy funkcjonalność zamknięcia
    (componentRef.instance as DialogComponentInterface).closeDialog = () => this.closeDialog(componentRef);
  }

  closeDialog(componentRef: any): void {
    // Usuwamy komponent z DOM
    this.appRef.detachView(componentRef.hostView);
    this.dialogContainer?.removeChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);

    // Jeśli nie ma już innych dialogów, usuwamy kontener
    if (this.dialogContainer?.childNodes.length === 0) {
      document.body.removeChild(this.dialogContainer);
      this.dialogContainer = null;
    }
  }
}
