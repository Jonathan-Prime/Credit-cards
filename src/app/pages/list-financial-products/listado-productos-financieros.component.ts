import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderListadoProductosFinancierosComponent } from '../header-list-financial-product/header-listado-productos-financieros.component';
import { TableListComponent } from '../table-list/table-list.component';
import { ListadoProductosFinancierosService } from '../../services/list-financial-products/listFinancialProducts.service';
import { FooterListadoProductosFinancierosComponent } from '../foooter-span/footer-listado-productos-financieros.component';

@Component({
  selector: 'app-listado-productos-financieros',
  standalone: true,
  templateUrl: './listado-productos-financieros.component.html',
  styleUrls: ['./listado-productos-financieros.component.scss'],
  imports: [
    CommonModule,
    HeaderListadoProductosFinancierosComponent,
    TableListComponent,
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
