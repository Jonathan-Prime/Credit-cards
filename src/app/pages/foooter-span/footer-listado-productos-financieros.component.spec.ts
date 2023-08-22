import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterListadoProductosFinancierosComponent } from './footer-listado-productos-financieros.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('FooterListadoProductosFinancierosComponent', () => {
  let component: FooterListadoProductosFinancierosComponent;
  let fixture: ComponentFixture<FooterListadoProductosFinancierosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterListadoProductosFinancierosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      FooterListadoProductosFinancierosComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render result count properly', () => {
    const element = fixture.debugElement;
    component.totalResults = of(1);
    fixture.detectChanges();
    expect(
      (element.query(By.css('p')).nativeElement as HTMLParagraphElement)
        .innerText
    ).toBe('1 Resultado');
  });

  it('should pluralize properly', () => {
    const element = fixture.debugElement;
    component.totalResults = of(2);
    fixture.detectChanges();
    expect(
      (element.query(By.css('p')).nativeElement as HTMLParagraphElement)
        .innerText
    ).toBe('2 Resultados');
  });
});
