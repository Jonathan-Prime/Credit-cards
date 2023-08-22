import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UniqueIdValidator implements AsyncValidator {
  private baseURL: string = `${environment.apiBaseBP}/bp/products/verification`;
  constructor(private httpClient: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.httpClient
      .get<{ data: boolean }>(
        this.baseURL,
        {
          params: { id: control.value },
        }
      )
      .pipe(
        map((existeId) => (existeId.data ? { existeId: true } : null)),
        catchError(() => of(null))
      );
  }
}
