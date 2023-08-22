import { Directive, ElementRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { MenuFlotanteListadoProductosFinancierosComponent } from '../pages/menu-flotante-listado-productos-financieros/menu-flotante-listado-productos-financieros.component';
import { FinancialProduct } from '../utils/format-date/formatDate';
@Directive({
  selector: '[appMenuFlotante]',
  standalone: true,
})
export class MenuFlotanteDirective {
  @HostListener('click', ['$event.target']) load(event: PointerEvent) {
    if (!this.elementRef) {
      this.loadComponent();
    } else if (
      this.elementRef &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.elementRef = undefined;
      this.unloadComponent();
    }
  }
  @HostListener('document:click', ['$event.target']) destroy(
    event: EventTarget
  ) {
    if ((event as HTMLElement).innerText !== 'more_vert' && this.elementRef) {
      this.elementRef = undefined;
      this.unloadComponent();
    }
  }

  @Input() data: FinancialProduct | undefined;
  elementRef: ElementRef<any> | undefined;
  constructor(public viewContainerRef: ViewContainerRef) {}

  loadComponent() {
    const componentInstance = this.viewContainerRef.createComponent(
      MenuFlotanteListadoProductosFinancierosComponent
    );
    componentInstance.instance.data = this.data;
    this.elementRef = this.viewContainerRef.element;
  }

  unloadComponent() {
    this.viewContainerRef.clear();
  }
}
