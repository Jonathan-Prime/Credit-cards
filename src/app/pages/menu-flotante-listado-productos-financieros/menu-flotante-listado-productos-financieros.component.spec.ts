import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFlotanteListadoProductosFinancierosComponent } from './menu-flotante-listado-productos-financieros.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FinancialProductService } from '../../services/financial-products/financialProducts.service';
import { FinancialProduct } from '../../utils/format-date/formatDate';

describe('MenuFlotanteListadoProductosFinancierosComponent', () => {
  let component: MenuFlotanteListadoProductosFinancierosComponent;
  let fixture: ComponentFixture<MenuFlotanteListadoProductosFinancierosComponent>;
  let productoFinancieroService: FinancialProductService;
  let httpClient: HttpClient;
  beforeEach(async () => {
    let productoFinancieroServiceSpy = jasmine.createSpyObj(
      'ProductoFinancieroService',
      ['deleteProductoFinanciero']
    );
    await TestBed.configureTestingModule({
      imports: [MenuFlotanteListadoProductosFinancierosComponent],
      providers: [
        {
          provide: FinancialProductService,
          useValue: productoFinancieroServiceSpy,
        },
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      MenuFlotanteListadoProductosFinancierosComponent
    );
    component = fixture.componentInstance;
    productoFinancieroService = TestBed.inject(FinancialProductService);
    httpClient = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteProductoFinanciero on the service', () => {
    const productoFinancieroMock = new FinancialProduct();
    productoFinancieroMock.id = 'test-id';
    component.data = productoFinancieroMock;
    component.deleteProducto();
    expect(
      productoFinancieroService.deleteFinancialProduct
    ).toHaveBeenCalled();
  });
});
