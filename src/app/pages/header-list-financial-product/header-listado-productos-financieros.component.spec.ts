import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderListadoProductosFinancierosComponent } from './header-listado-productos-financieros.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('HeaderListadoProductosFinancierosComponent', () => {
  let component: HeaderListadoProductosFinancierosComponent;
  let fixture: ComponentFixture<HeaderListadoProductosFinancierosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderListadoProductosFinancierosComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(
      HeaderListadoProductosFinancierosComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
