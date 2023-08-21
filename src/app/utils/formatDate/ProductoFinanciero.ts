import { FinancialProducts } from '../../types/financialProduct';

export class ProductoFinanciero {
  dateRelease: Date = new Date();
  dateRevision: Date = new Date();
  description: string = '';
  id: string = '';
  logo: string = '';
  name: string = '';

  constructor() {}

  fromDTO(product: FinancialProducts) {
    this.dateRelease = this.stringToDate(product.date_release);
    this.dateRevision = this.stringToDate(product.date_revision);

    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.logo = product.logo;
  }

  private stringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
