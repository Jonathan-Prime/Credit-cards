import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorListadoProductosFinancierosComponent } from './paginador-listado-productos-financieros.component';

describe('PaginadorListadoProductosFinancierosComponent', () => {
  let component: PaginadorListadoProductosFinancierosComponent;
  let fixture: ComponentFixture<PaginadorListadoProductosFinancierosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PaginadorListadoProductosFinancierosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginadorListadoProductosFinancierosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
