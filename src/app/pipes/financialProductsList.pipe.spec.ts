import { TestBed, waitForAsync } from '@angular/core/testing';
import { ListadoProductosFinancierosService } from '../services/list-financial-products/listFinancialProducts.service';
import { SearchListFinancialProductsPipe } from './searchListFinancialProducts.pipe';
import { FinancialProduct } from '../utils/format-date/formatDate';

describe('SearchListFinancialProductsPipe', () => {
  let financialProductsListService: ListadoProductosFinancierosService;
  beforeEach(waitForAsync(() => {
    const listFinancialProductsServiceSpy = jasmine.createSpyObj(
      'FinancialProductsListService',
      ['setCurrentResultLength']
    );
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ListadoProductosFinancierosService,
          useValue: listFinancialProductsServiceSpy,
        },
      ],
    });
    financialProductsListService = TestBed.inject(
      ListadoProductosFinancierosService
    );
  }));

  it('create an instance', () => {
    const pipe = new SearchListFinancialProductsPipe(
      financialProductsListService
    );
    expect(pipe).toBeTruthy();
  });

  it('should return a single value that matches search criteria', () => {
    const pipe = new SearchListFinancialProductsPipe(
      financialProductsListService
    );
    const productoId = 'product-456';
    let mockData: FinancialProduct[] = [
      new FinancialProduct(undefined, undefined, undefined, productoId),
    ];
    const searchResult = pipe.transform(mockData, productoId);
    expect(searchResult).toHaveSize(1);
  });

  it('should return an empty array for no matching criteria', () => {
    const pipe = new SearchListFinancialProductsPipe(
      financialProductsListService
    );
    const productoId = 'product-456';
    const unmatch = 'no-match-id';
    let mockData: FinancialProduct[] = [
      new FinancialProduct(undefined, undefined, undefined, productoId),
    ];
    const searchResult = pipe.transform(mockData, unmatch);
    expect(searchResult).toHaveSize(0);
  });

  it('should return an empty array if null is given as value', () => {
    const pipe = new SearchListFinancialProductsPipe(
      financialProductsListService
    );
    const searchResult = pipe.transform(null, 'no-value');
    expect(searchResult).toBeInstanceOf(Array);
  });

  it('should set results length after filtering', () => {
    const pipe = new SearchListFinancialProductsPipe(
      financialProductsListService
    );
    const productoId = 'product-456';
    let mockData: FinancialProduct[] = [
      new FinancialProduct(undefined, undefined, undefined, productoId),
    ];
    pipe.transform(mockData, productoId);
    expect(
      financialProductsListService.setCurrentResultLength
    ).toHaveBeenCalled();
  });

  it('should set results length when search argument is null', () => {
    const pipe = new SearchListFinancialProductsPipe(
      financialProductsListService
    );
    let mockData: FinancialProduct[] = [
      new FinancialProduct(undefined, undefined, undefined, 'product-456'),
    ];
    pipe.transform(mockData, null);
    expect(
      financialProductsListService.setCurrentResultLength
    ).toHaveBeenCalled();
  });
});
