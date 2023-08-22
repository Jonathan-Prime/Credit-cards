import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { ErrorsDictionary, formErrorsDictionary } from './ErrorsDictionary';
@Component({
  selector: 'app-input-error-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-error-box.component.html',
  styleUrls: ['./input-error-box.component.scss'],
})
export class InputErrorBoxComponent {
  errorMessage = '';
  @Input() set error(error: ValidationErrors | null | undefined) {
    if (error) {
      const errorString = <keyof ErrorsDictionary>(
        (<string>Object.keys(error as Object)[0])
      );
      this.errorMessage = formErrorsDictionary[errorString];
    } else {
      this.errorMessage = '';
    }
  }
}
