import { ProductoFinanciero } from './ProductoFinanciero'; // Asegúrate de que la ruta sea correcta
import { FinancialProducts } from '../../types/financialProduct';

describe('ProductoFinanciero', () => {
  let productoFinanciero: ProductoFinanciero;

  beforeEach(() => {
    productoFinanciero = new ProductoFinanciero();
  });

  it('should create an instance', () => {
    expect(productoFinanciero).toBeTruthy();
  });

  it('should set properties from DTO', () => {
    const financialProduct: FinancialProducts = {
      id: '123',
      name: 'Sample Product',
      description: 'Sample description',
      logo: 'sample-logo.png',
      date_release: '2023-08-21',
      date_revision: '2023-08-22'
    };

    productoFinanciero.fromDTO(financialProduct);

    expect(productoFinanciero.id).toBe('123');
    expect(productoFinanciero.name).toBe('Sample Product');
    expect(productoFinanciero.description).toBe('Sample description');
    expect(productoFinanciero.logo).toBe('sample-logo.png');
    expect(productoFinanciero.dateRelease).toEqual(new Date('2023-08-21'));
    expect(productoFinanciero.dateRevision).toEqual(new Date('2023-08-22'));
  });
});

