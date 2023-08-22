import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearProductoFinancieroComponent } from './crear-producto-financiero.component';
import { provideHttpClient } from '@angular/common/http';
import { FinancialProductService } from '../../services/financial-products/financialProducts.service';

describe('CrearProductoFinancieroComponent', () => {
  const productoFinancieroMock = {
    id: 'new-prod-id',
    name: 'New Debit Card',
    description: 'A new financial product description',
    logo: 'https://icons-for-free.com/iconfiles/png/512/Mastercard-1320568127572298248.png',
    date_release: '2023-08-21T12:00:00.000Z',
    date_revision: '2024-08-21T12:00:00.000Z',
  };
  

  let component: CrearProductoFinancieroComponent;
  let fixture: ComponentFixture<CrearProductoFinancieroComponent>;
  let productoFinancieroService: FinancialProductService;
  beforeEach(async () => {
    const productoFinancieroServicespy = jasmine.createSpyObj(
      'ProductoFinancieroService',
      ['createProductoFinanciero']
    );
    await TestBed.configureTestingModule({
      imports: [CrearProductoFinancieroComponent],
      providers: [
        provideHttpClient(),
        FinancialProductService,
        {
          provide: FinancialProductService,
          useValue: productoFinancieroServicespy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearProductoFinancieroComponent);
    productoFinancieroService = TestBed.inject(FinancialProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate in add new product', () => {
    const spy = spyOn(component, 'addNewProduct');
    component.addNewProduct(productoFinancieroMock);
    expect(spy).toHaveBeenCalled();
  });

  it('should call createProductoFinanciero on the service', () => {
    productoFinancieroService.createProductoFinanciero(productoFinancieroMock);
    component.addNewProduct(productoFinancieroMock);
    expect(
      productoFinancieroService.createProductoFinanciero
    ).toHaveBeenCalledWith(productoFinancieroMock);
  });
});
