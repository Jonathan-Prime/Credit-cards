import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-financiero-imagen-listado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-financiero-imagen-listado.component.html',
  styleUrls: ['./producto-financiero-imagen-listado.component.scss'],
})
export class ProductoFinancieroImagenListadoComponent {
  @Input() imagenSrc = '';
}
