import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioProductoFinancieroComponent } from '../formulario-producto-financiero/formulario-producto-financiero.component';
import { FinancialProductService } from '../../services/financial-products/financialProducts.service';
import { FinancialProductsModel } from '../../types/financialProduct';

@Component({
  selector: 'app-crear-producto-financiero',
  standalone: true,
  imports: [CommonModule, FormularioProductoFinancieroComponent],
  templateUrl: './crear-producto-financiero.component.html'
})
export class CrearProductoFinancieroComponent {
  constructor(private FinancialProductService: FinancialProductService) {}

  addNewProduct(productoFinanciero: FinancialProductsModel) {
    this.FinancialProductService.createProductoFinanciero(productoFinanciero);
  }
}
