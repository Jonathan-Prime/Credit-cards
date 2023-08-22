import { FinancialProduct } from './formatDate';
import { FinancialProductsModel } from '../../types/financialProduct';

describe('formatDateSpec', () => {
  let FinancialProduct: FinancialProduct;

  it('should create an instance', () => {
    expect(FinancialProduct).toBeTruthy();
  });

  it('should set properties from DtoS', () => {
    const financialProduct: FinancialProductsModel = {
      id: '123',
      name: 'Sample Product',
      description: 'Sample description',
      logo: 'sample-logo.png',
      date_release: '2023-08-21',
      date_revision: '2023-08-22'
    };

    FinancialProduct.fromDtoS(financialProduct);

    expect(FinancialProduct.id).toBe('123');
    expect(FinancialProduct.name).toBe('Sample Product');
    expect(FinancialProduct.description).toBe('Sample description');
    expect(FinancialProduct.logo).toBe('sample-logo.png');
    expect(FinancialProduct.dateRelease).toEqual(new Date('2023-08-21'));
    expect(FinancialProduct.dateRevision).toEqual(new Date('2023-08-22'));
  });
});

