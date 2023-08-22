import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListadoProductosFinancierosService } from './listFinancialProducts.service';
import { FinancialProductsModel } from '../../types/financialProduct';
import { FinancialProduct } from '../../utils/format-date/formatDate';
import { environment } from 'src/app/environments/environment';

describe('ListadoProductosFinancierosService', () => {
  const url = `${environment.apiBaseBP}/bp/products/`; 
  let service: ListadoProductosFinancierosService;
  let client: HttpTestingController;
  let controller: HttpTestingController;
  let responsePlaceholder: FinancialProductsModel[] = [
    {
      id: 'card-123',
      name: 'Tarjeta de Crédito',
      description: 'Una tarjeta de crédito premium con amplios beneficios.',
      logo: 'logo-tarjeta-oro.png',
      date_release: '2023-01-15T00:00:00.000+00:00',
      date_revision: '2024-01-15T00:00:00.000+00:00',
    },
    {
      id: 'product-456',
      name: 'Préstamo Personal Plus',
      description: 'Un préstamo personal con tasas competitivas.',
      logo: 'logo-prestamo-plus.png',
      date_release: '2023-02-10T00:00:00.000+00:00',
      date_revision: '2024-02-10T00:00:00.000+00:00',
    },
    {
      id: 'product-789',
      name: 'Cuenta de Ahorro Joven',
      description: 'Una cuenta de ahorro diseñada para jóvenes.',
      logo: 'logo-cuenta-joven.png',
      date_release: '2023-03-20T00:00:00.000+00:00',
      date_revision: '2024-03-20T00:00:00.000+00:00',
    },
  ];



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ListadoProductosFinancierosService],
    });
    service = TestBed.inject(ListadoProductosFinancierosService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call updateSearchString', () => {
    spyOn(service, 'updateSearchString');
    service.updateSearchString('value');
    expect(service.updateSearchString).toHaveBeenCalled();
  });

  it('should call setCurrentResultLength', () => {
    spyOn(service, 'setCurrentResultLength');
    service.setCurrentResultLength(1);
    expect(service.setCurrentResultLength).toHaveBeenCalled();
  });

  it('should start searchString observable as empty string', (done: DoneFn) => {
    service.searchString$.subscribe((value) => {
      expect(value).toEqual('');
      done();
    });
  });

  it('should push new searchString value', (done: DoneFn) => {
    service['searchString'].subscribe((value) => {
      expect(value).toEqual('test');
      done();
    });
    service.updateSearchString('test');
  });

  it('should start currentResultsLength observable as 0', (done: DoneFn) => {
    service.currentResultLength$.subscribe((value) => {
      expect(value).toBe(0);
      done();
    });
  });

  it('should properly map DtoS response', () => {
    service.listadoProductosFiancieros$.subscribe((value) => {
      expect(value).toEqual(jasmine.arrayContaining([jasmine.any(FinancialProduct)]));
    });
    const req = controller.expectOne(url);
    req.flush({ data: responsePlaceholder });
  });

  it('should return an empty array if request fails', () => {
    service.listadoProductosFiancieros$.subscribe((value) => {
      expect(value).toEqual([]);
    });
    const req = controller.expectOne(url);
    req.flush('Error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should return new financial products array on refetch', (done: DoneFn) => {
    service.refetchListado();
    service.listadoProductosFiancieros$.subscribe((value) => {
      expect(value).toEqual(jasmine.arrayContaining([jasmine.any(FinancialProduct)]));
      done();
    });
    const req = controller.expectOne(url);
    req.flush({ data: responsePlaceholder });
  });

  afterEach(() => {
    controller.verify();
  });
});
