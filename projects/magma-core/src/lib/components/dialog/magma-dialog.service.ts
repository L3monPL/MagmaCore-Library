import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

export interface DialogComponentInterface {
  data: any;
  closeDialog: (result?: any) => void;
}

@Injectable({
  providedIn: 'root'
})
export class MagmaDialogService {

  private dialogContainer: HTMLElement | null = null;
  private activeDialogRef?: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  private createDialogContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('dialog-container');
    document.body.appendChild(container);
    return container;
  }

  openDialog(component: Type<any>, data: any): Promise<any> {
    return new Promise((resolve) => {
      // Zamknij istniejący dialog, jeśli otwarty
      if (this.activeDialogRef) {
        this.closeDialog();
      }

      if (!this.dialogContainer) {
        this.dialogContainer = this.createDialogContainer();
      }

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = componentFactory.create(this.injector);
      this.activeDialogRef = componentRef;

      const instance = componentRef.instance as DialogComponentInterface;
      instance.data = data;

      instance.closeDialog = (result?: any) => {
        this.closeDialog();
        resolve(result);
      };

      this.appRef.attachView(componentRef.hostView);

      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      this.dialogContainer.appendChild(domElem);
    });
  }

  closeDialog(): void {
    if (!this.activeDialogRef) return;

    const componentRef = this.activeDialogRef;
    const viewRef = componentRef.hostView as EmbeddedViewRef<any>;
    const element = viewRef.rootNodes[0] as HTMLElement;

    this.appRef.detachView(viewRef);
    componentRef.destroy(); // ✅ zniszcz komponent – uruchomi ngOnDestroy()
    this.activeDialogRef = undefined;

    // ✅ bezpiecznie usuń z DOM
    if (this.dialogContainer?.contains(element)) {
      this.dialogContainer.removeChild(element);
    }

    if (this.dialogContainer?.childNodes.length === 0) {
      document.body.removeChild(this.dialogContainer);
      this.dialogContainer = null;
    }
  }
}
