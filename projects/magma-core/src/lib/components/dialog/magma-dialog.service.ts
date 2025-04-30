import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';

export interface DialogComponentInterface {
  data: any;
  closeDialog: (result?: any) => void;
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

  openDialog(component: any, data: any): Promise<any> {
    return new Promise((resolve) => {
      // Tworzymy kontener
      if (!this.dialogContainer) {
        this.dialogContainer = this.createDialogContainer();
      }

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = componentFactory.create(this.injector);

      // Przekazujemy dane
      const instance = componentRef.instance as DialogComponentInterface;
      instance.data = data;

      // Definiujemy closeDialog z możliwością przekazania wyniku
      instance.closeDialog = (result?: any) => {
        this.closeDialog(componentRef);
        resolve(result);
      };

      // Osadzamy w DOM
      this.appRef.attachView(componentRef.hostView);
      this.dialogContainer.appendChild(
        (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]
      );
    });
  }

  private closeDialog(componentRef: any): void {
    this.appRef.detachView(componentRef.hostView);
    this.dialogContainer?.removeChild(
      (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]
    );

    if (this.dialogContainer?.childNodes.length === 0) {
      document.body.removeChild(this.dialogContainer);
      this.dialogContainer = null;
    }
  }
}
