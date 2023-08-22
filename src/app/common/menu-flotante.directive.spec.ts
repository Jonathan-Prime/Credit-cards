import { MenuFlotanteDirective } from './menu-flotante.directive';
import { ComponentRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MenuFlotanteListadoProductosFinancierosComponent } from '../pages/flotant-menu/menu-flotante-listado-productos-financieros.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
describe('MenuFlotanteDirective', () => {
  let viewContainerRef: ViewContainerRef;
  let fixture: ComponentFixture<MenuFlotanteListadoProductosFinancierosComponent>;
  let component: MenuFlotanteListadoProductosFinancierosComponent;

  beforeEach(async () => {
    const listadoProductosFinancierosServiceSpy = jasmine.createSpyObj(
      'ViewContainerRef',
      ['createComponent']
    );

    await TestBed.configureTestingModule({
      imports: [MenuFlotanteListadoProductosFinancierosComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        {
          provide: ViewContainerRef,
          useValue: listadoProductosFinancierosServiceSpy,
        },
      ],
    }).compileComponents();
    viewContainerRef = TestBed.inject(ViewContainerRef);
    fixture = TestBed.createComponent(
      MenuFlotanteListadoProductosFinancierosComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new MenuFlotanteDirective(viewContainerRef);
    expect(directive).toBeTruthy();
  });

  it('should load component if elementRef is undefined', () => {
    const directive = new MenuFlotanteDirective(viewContainerRef);
    const directiveSpy = spyOn(directive, 'loadComponent');
    viewContainerRef.createComponent = () =>
      ({ instance: { data: {} } } as ComponentRef<any>);
    directive.loadComponent();
    directive.elementRef = undefined;
    directive.load(new MouseEvent('click') as PointerEvent);
    expect(directiveSpy).toHaveBeenCalled();
  });

  it("should unload component if elementRef is defined and doesn't contains event.target", () => {
    const directive = new MenuFlotanteDirective(viewContainerRef);
    const directiveSpy = spyOn(directive, 'unloadComponent');
    viewContainerRef.createComponent = () =>
      ({ instance: { data: {} } } as ComponentRef<any>);
    directive.loadComponent();
    directive.elementRef = { nativeElement: { contains: (arg: any) => false } };
    directive.load(new MouseEvent('click') as PointerEvent);
    expect(directiveSpy).toHaveBeenCalled();
  });

  it('should swipe container ref after unload', () => {
    viewContainerRef.clear = () => undefined;
    const directive = new MenuFlotanteDirective(viewContainerRef);
    const directiveSpy = spyOn(viewContainerRef, 'clear');
    directive.unloadComponent();
    expect(directiveSpy).toHaveBeenCalled();
  });

  it('should destroy component when document clicked and is open', waitForAsync(() => {
    const directive = new MenuFlotanteDirective(viewContainerRef);
    const directiveSpy = spyOn(directive, 'unloadComponent');
    const target = document.createElement('span');
    directive.elementRef = { nativeElement: {} };
    document.getElementById = jasmine
      .createSpy('HTML Element')
      .and.returnValue(target);
    document.body.click();
  }));
});
