import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchListFinancialProductsPipe } from '../../pipes/searchListFinancialProducts.pipe';
import { FinancialProduct } from '../../utils/format-date/formatDate';
import { ProductoFinancieroImagenListadoComponent } from '../image-financial-product/producto-financiero-imagen-listado.component';
import { FooterListadoProductosFinancierosComponent } from '../foooter-span/footer-listado-productos-financieros.component';
import { MenuFlotanteDirective } from '../../common/menu-flotante.directive';

@Component({
  selector: 'app-table-list',
  standalone: true,
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  imports: [
    CommonModule,
    SearchListFinancialProductsPipe,
    ProductoFinancieroImagenListadoComponent,
    FooterListadoProductosFinancierosComponent,
    MenuFlotanteDirective,
  ],
})
export class TableListComponent {
  @Input() listadoProductosFinancieros$: Observable<FinancialProduct[]> = of(
    []
  );
  @Input() searchString$: Observable<string> = of('');
}
