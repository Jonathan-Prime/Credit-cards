import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { FinancialProductsListService } from '../list-financial-products/listFinancialProducts.service';
import { FinancialProductService } from './financialProducts.service';

describe('FinancialProductService', () => {
  let controller: HttpTestingController;
  let financialProductsListServiceSpy: FinancialProductsListService;
  let routerSpy: Router;
  let financialProductService: FinancialProductService;

  const financialProductMock = {
    id: 'trj-crd2',
    name: 'Credit Cards',
    description: 'Credit card for consumer use',
    logo: 'https://icons-for-free.com/iconfiles/png/512/Mastercard-1320568127572298248.png',
    date_release: '2023-05-08T19:36:55.124Z',
    date_revision: '2024-05-08T19:36:55.124Z',
  };

  beforeEach(() => {
    const financialProductsListServiceSpyObj = jasmine.createSpyObj(
      'FinancialProductsListService',
      ['refetchList']
    );
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        {
          provide: FinancialProductsListService,
          useValue: financialProductsListServiceSpyObj,
        },
        {
          provide: Router,
          useValue: routerSpyObj,
        },
      ],
    });

    financialProductsListServiceSpy = TestBed.inject(FinancialProductsListService);
    controller = TestBed.inject(HttpTestingController);
    financialProductService = TestBed.inject(FinancialProductService);
    routerSpy = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(financialProductService).toBeTruthy();
  });

  it('should create a new product successfully', () => {
    financialProductService.createFinancialProduct(financialProductMock);

    const req = controller.expectOne(`${financialProductService['baseURL']}`);
    expect(req.request.method).toEqual('POST');
    req.flush(financialProductMock);
    expect(
      financialProductsListServiceSpy.refetchFinancialProducts
    ).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should handle service error when creating a new product', () => {
    financialProductService.createFinancialProduct(financialProductMock);
    const req = controller.expectOne(`${financialProductService['baseURL']}`);
    req.flush('Error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
    expect(
      financialProductsListServiceSpy.refetchFinancialProducts
    ).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should update product successfully', () => {
    financialProductService.updateFinancialProduct(financialProductMock);

    const req = controller.expectOne(`${financialProductService['baseURL']}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(financialProductMock);
    expect(
      financialProductsListServiceSpy.refetchFinancialProducts
    ).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should handle service error when updating a product', () => {
    financialProductService.updateFinancialProduct(financialProductMock);
    const req = controller.expectOne(`${financialProductService['baseURL']}`);
    req.flush('Error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
    expect(
      financialProductsListServiceSpy.refetchFinancialProducts
    ).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should delete product successfully', () => {
    const idPlaceholder = 'test-id';
    financialProductService.deleteFinancialProduct(idPlaceholder);

    const req = controller.expectOne(`${financialProductService['baseURL']}?id=${idPlaceholder}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(financialProductMock);
    expect(
      financialProductsListServiceSpy.refetchFinancialProducts
    ).toHaveBeenCalled();
  });

  it('should handle service error when deleting a product', () => {
    const idPlaceholder = 'test-id';
    financialProductService.deleteFinancialProduct(idPlaceholder);

    const req = controller.expectOne(`${financialProductService['baseURL']}?id=${idPlaceholder}`);
    req.flush('Error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
    expect(
      financialProductsListServiceSpy.refetchFinancialProducts
    ).toHaveBeenCalled();
  });

  afterEach(() => {
    controller.verify();
  });
});
