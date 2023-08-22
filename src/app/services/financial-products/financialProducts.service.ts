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
  private authorId = `${environment.authorId}`;
  private apiBaseBP = `${environment.apiBaseBP}`;

  constructor(
    private httpClient: HttpClient,
    private financialProductsListService: ListadoProductosFinancierosService,
    private router: Router
  ) {}
  createProductoFinanciero(productoFinancieroDTO: FinancialProductsModel) {
    const headers = new HttpHeaders({
      authorId: this.authorId,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  
    this.httpClient
      .post<FinancialProductsModel>(
        `${this.apiBaseBP}/bp/products/`,
        productoFinancieroDTO,
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
  
  updateProductoFinanciero(productoFinancieroDTO: FinancialProductsModel) {
    const headers = new HttpHeaders({
      authorId: this.authorId,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  
    this.httpClient
      .put<FinancialProductsModel>(
        `${this.apiBaseBP}/bp/products/`,
        productoFinancieroDTO,
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
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  
    this.httpClient
      .delete(
        `${this.apiBaseBP}/bp/products/`,
        { headers, params: { id } }
      )
      .pipe(
        finalize(() =>
          this.financialProductsListService.refetchListado()
        ),
        catchError(() => of(EMPTY))
      )
      .subscribe();
  }
  
}
