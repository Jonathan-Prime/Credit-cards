import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-productos-financieros',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './financial-products.component.html',
  styleUrls: ['./financial-products.component.scss'],
})
export class FinancialProductsComponent {}
