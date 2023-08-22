import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderListadoProductosFinancierosComponent } from '../header-listado-productos-financieros/header-listado-productos-financieros.component';
import { TablaListadoProductosFinancierosComponent } from '../tabla-listado-productos-financieros/tabla-listado-productos-financieros.component';
import { ListadoProductosFinancierosService } from '../../services/list-financial-products/listFinancialProducts.service';
import { FooterListadoProductosFinancierosComponent } from '../footer-listado-productos-financieros/footer-listado-productos-financieros.component';

@Component({
  selector: 'app-listado-productos-financieros',
  standalone: true,
  templateUrl: './listado-productos-financieros.component.html',
  styleUrls: ['./listado-productos-financieros.component.scss'],
  imports: [
    CommonModule,
    HeaderListadoProductosFinancierosComponent,
    TablaListadoProductosFinancierosComponent,
    FooterListadoProductosFinancierosComponent,
  ],
})
export class ListadoProductosFinancierosComponent {
  currentResultLength$;
  listadoProductosFinancieros$;
  searchString$;
  constructor(
    private list: ListadoProductosFinancierosService
  ) {
    this.listadoProductosFinancieros$ =
      this.list.listadoProductosFiancieros$;
    this.searchString$ = this.list.searchString$;
    this.currentResultLength$ =
      this.list.currentResultLength$;
  }
}
