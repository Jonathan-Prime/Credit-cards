import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoProductosFinancierosService } from '../../services/list-financial-products/listFinancialProducts.service';

@Component({
  selector: 'app-searchbar-tabla-listado-productos-financieros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searchbar-tabla-listado-productos-financieros.component.html',
  styleUrls: ['./searchbar-tabla-listado-productos-financieros.component.scss'],
})
export class SearchbarTablaListadoProductosFinancierosComponent {
  constructor(
    private listadoProductosFinancierosService: ListadoProductosFinancierosService
  ) {}

  updateSearch(event: Event) {
    this.listadoProductosFinancierosService.updateSearchString(
      (event.target as HTMLInputElement).value
    );
  }
}
