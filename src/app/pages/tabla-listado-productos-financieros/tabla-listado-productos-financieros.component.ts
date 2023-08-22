import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchListFinancialProductsPipe } from '../../pipes/searchListFinancialProducts.pipe';
import { FinancialProduct } from '../../utils/format-date/formatDate';
import { ProductoFinancieroImagenListadoComponent } from '../producto-financiero-imagen-listado/producto-financiero-imagen-listado.component';
import { FooterListadoProductosFinancierosComponent } from '../footer-listado-productos-financieros/footer-listado-productos-financieros.component';
import { MenuFlotanteDirective } from '../../common/menu-flotante.directive';

@Component({
  selector: 'app-tabla-listado-productos-financieros',
  standalone: true,
  templateUrl: './tabla-listado-productos-financieros.component.html',
  styleUrls: ['./tabla-listado-productos-financieros.component.scss'],
  imports: [
    CommonModule,
    SearchListFinancialProductsPipe,
    ProductoFinancieroImagenListadoComponent,
    FooterListadoProductosFinancierosComponent,
    MenuFlotanteDirective,
  ],
})
export class TablaListadoProductosFinancierosComponent {
  @Input() listadoProductosFinancieros$: Observable<FinancialProduct[]> = of(
    []
  );
  @Input() searchString$: Observable<string> = of('');
}
