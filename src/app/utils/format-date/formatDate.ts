import { FinancialProductsModel } from '../../types/financialProduct';

export class FinancialProduct {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public logo: string = '',
    public dateRelease: Date = new Date(),
    public dateRevision: Date = new Date(),
  ) {}

  fromDtoS(productoFinancieroDTO: FinancialProductsModel) {
    this.dateRelease = dtoDateStringToDate(productoFinancieroDTO.date_release);
    this.dateRevision = dtoDateStringToDate(
      productoFinancieroDTO.date_revision
    );
    this.description = productoFinancieroDTO.description;
    this.id = productoFinancieroDTO.id;
    this.logo = productoFinancieroDTO.logo;
    this.name = productoFinancieroDTO.name;

    function dtoDateStringToDate(dateString: string) {
      return new Date(
        Number(dateString.substring(0, 4)),
        Number(dateString.substring(5, 7)) - 1,
        Number(dateString.substring(8, 10))
      );
    }
  }
}
