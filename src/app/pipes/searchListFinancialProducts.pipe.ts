import { Pipe, PipeTransform } from '@angular/core';
import { FinancialProduct } from '../utils/format-date/formatDate';
import { ListadoProductosFinancierosService } from '../services/list-financial-products/listFinancialProducts.service';

@Pipe({
  name: 'searchListFinancialProducts',
  standalone: true,
})
export class SearchListFinancialProductsPipe implements PipeTransform {
  constructor(
    private financialProductsListService: ListadoProductosFinancierosService
  ) {}

  transform(
    products: FinancialProduct[] | null,
    searchTerm: string | null
  ): FinancialProduct[] {
    if (!searchTerm) {
      this.financialProductsListService.setCurrentResultLength(
        products?.length ?? 0
      );
      return products ?? [];
    }

    const filteredProducts = [];

    if (products && searchTerm) {
      for (const product of products) {
        const rowStrings: (string | Date)[] = Object.values(product);
        
        for (let j = 0; j < rowStrings.length; j++) {
          if (rowStrings[j] instanceof Date) {
            const dateISO = (rowStrings[j] = (<Date>rowStrings[j]).toISOString());
            const year = dateISO.substring(2, 4);
            let month = dateISO.substring(5, 7);
            if (Number(month) < 10) {
              month = month.substring(1);
            }
            let day = dateISO.substring(8, 10);
            if (Number(day) < 10) {
              day = day.substring(1);
            }
            rowStrings[j] = `${day}/${month}/${year}`;
          }
          if ((<string>rowStrings[j]).toLowerCase().includes(searchTerm.toLowerCase())) {
            filteredProducts.push(product);
            break;
          }
        }
      }
    }

    this.financialProductsListService.setCurrentResultLength(
      filteredProducts.length
    );
    
    return filteredProducts;
  }
}

