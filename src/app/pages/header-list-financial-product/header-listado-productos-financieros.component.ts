import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarTablaListadoProductosFinancierosComponent } from '../searchbar/searchbar-tabla-listado-productos-financieros.component';
import { BtnGenericComponent } from '../../utils/button/btnGeneric';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-listado-productos-financieros',
  standalone: true,
  templateUrl: './header-listado-productos-financieros.component.html',
  styleUrls: ['./header-listado-productos-financieros.component.scss'],
  imports: [
    BtnGenericComponent,
    CommonModule,
    RouterLink,
    SearchbarTablaListadoProductosFinancierosComponent,
  ],
})
export class HeaderListadoProductosFinancierosComponent {}
