import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boton-generico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btnGeneric.html',
  styleUrls: ['./btnGeneric.scss'],
})
export class BtnGenericComponent {
  @Input() buttonBgColor: ButtonBgColor = 'yellow';
  @Input() buttonText = '';
  @Input() disabled = false;
  @Input() buttonType: ButtonType = 'button';
}

type ButtonBgColor = 'yellow' | 'gray';
type ButtonType = 'submit' | 'button' | 'reset';
