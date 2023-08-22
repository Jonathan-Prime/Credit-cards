import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-producto-financiero',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './producto-financiero.component.html',
  styleUrls: ['./producto-financiero.component.scss'],
})
export class ProductoFinancieroComponent {}
