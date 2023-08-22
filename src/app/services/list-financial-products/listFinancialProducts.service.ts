import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { FinancialProductsModel } from '../../types/financialProduct';
import { FinancialProduct } from '../../utils/format-date/formatDate';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListadoProductosFinancierosService {
  private authorId = `${environment.authorId}`;
  private apiBaseBP = `${environment.apiBaseBP}`;

  currentResultLength$;
  listadoProductosFiancieros$;
  searchString$;

  private currentResultsLength;
  private getListadoProductosFinancieros$;
  private listadoProductosFiancieros;
  private searchString;

  constructor(private httpClient: HttpClient) {
    this.listadoProductosFiancieros = new Subject<FinancialProduct[]>();
    this.currentResultsLength = new Subject<number>();
    const headers = new HttpHeaders({
      authorId: this.authorId,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    this.getListadoProductosFinancieros$ = this.httpClient.get<FinancialProductsModel[]>(
      `${this.apiBaseBP}/bp/products/`, { headers }
    );
    this.currentResultLength$ = this.currentResultsLength.pipe(startWith(0));
    this.listadoProductosFiancieros$ = this.listadoProductosFiancieros.pipe(
      startWith(true),
      switchMap(() => this.getListadoProductosFinancieros$),
      tap((listadoProductosFiancierosDTO) =>
        this.currentResultsLength.next(
          listadoProductosFiancierosDTO.length
        )
      ),
      map((listadoProductosFinancierosDTO) =>
        listadoProductosFinancierosDTO.map<FinancialProduct>(
          (productoFinancieroDTO) => {
            const producto = new FinancialProduct();
            producto.fromDtoS(productoFinancieroDTO);
            return producto;
          }
        )
      ),
      catchError(() => of([])));
    this.searchString = new Subject<string>();
    this.searchString$ = this.searchString.pipe(startWith(''));
  }

  updateSearchString(searchString: string) {
    this.searchString.next(searchString);
  }

  setCurrentResultLength(length: number) {
    this.currentResultsLength.next(length);
  }

  refetchListado() {
    this.listadoProductosFiancieros.next([]);
  }
}
