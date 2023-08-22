import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginadorListadoProductosFinancierosComponent } from '../paginador-listado-productos-financieros/paginador-listado-productos-financieros.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-footer-listado-productos-financieros',
  standalone: true,
  templateUrl: './footer-listado-productos-financieros.component.html',
  styleUrls: ['./footer-listado-productos-financieros.component.scss'],
  imports: [CommonModule, PaginadorListadoProductosFinancierosComponent],
})
export class FooterListadoProductosFinancierosComponent {
  @Input() totalResults: Observable<number> = of(0);
}
