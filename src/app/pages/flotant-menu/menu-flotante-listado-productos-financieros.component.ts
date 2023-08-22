import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FinancialProductService } from '../../services/financial-products/financialProducts.service';
import { FinancialProduct } from '../../utils/format-date/formatDate';

@Component({
  selector: 'app-menu-flotante-listado-productos-financieros',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-flotante-listado-productos-financieros.component.html',
  styleUrls: ['./menu-flotante-listado-productos-financieros.component.scss'],
})
export class MenuFlotanteListadoProductosFinancierosComponent {
  data?: FinancialProduct;
  constructor(private productoFinancieroService: FinancialProductService) {}
  deleteProducto() {
    this.productoFinancieroService.deleteProductoFinanciero(this.data!.id);
  }
}
