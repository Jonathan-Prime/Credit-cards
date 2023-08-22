import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [LayoutComponent],
})
export class AppComponent {
  title = 'banco-pichincha';
}
