import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, catchError, finalize, of } from 'rxjs';
import { Router } from '@angular/router';

import { FinancialProductsModel } from '../../types/financialProduct';
import { ListadoProductosFinancierosService } from '../list-financial-products/listFinancialProducts.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FinancialProductService {
  private baseURL: string = `${environment.apiBaseBP}/bp/products/`;
  private authorId = `${environment.authorId}`;

  constructor(
    private httpClient: HttpClient,
    private financialProductsListService: ListadoProductosFinancierosService,
    private router: Router
  ) {}

  createProductoFinanciero(financialProduct: FinancialProductsModel) {
    const headers = new HttpHeaders({
      authorId: this.authorId,
      'Content-Type': 'text/plain;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    });

    return this.httpClient
      .post<FinancialProductsModel>(
        this.baseURL,
        financialProduct,
        { headers }
      )
      .pipe(
        finalize(() => {
          this.financialProductsListService.refetchListado();
          this.router.navigate(['']);
        }),
        catchError(() => of(EMPTY))
      )
      .subscribe();
  }

  updateProductoFinanciero(financialProduct: FinancialProductsModel) {
    const headers = new HttpHeaders({
      authorId: this.authorId,
      'Content-Type': 'text/plain;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    });

    return this.httpClient
      .put<FinancialProductsModel>(
        `${this.baseURL}${financialProduct.id}`, // Asegúrate de tener el ID correcto aquí
        financialProduct,
        { headers }
      )
      .pipe(
        finalize(() => {
          this.financialProductsListService.refetchListado();
          this.router.navigate(['']);
        }),
        catchError(() => of(EMPTY))
      )
      .subscribe();
  }

  deleteProductoFinanciero(id: string) {
    const headers = new HttpHeaders({
      authorId: this.authorId,
      'Content-Type': 'text/plain;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    });

    return this.httpClient
      .delete(
        `${this.baseURL}/${id}`,
        { headers }
      )
      .pipe(
        finalize(() => this.financialProductsListService.refetchListado()),
        catchError(() => of(EMPTY))
      )
      .subscribe();
  }
}
