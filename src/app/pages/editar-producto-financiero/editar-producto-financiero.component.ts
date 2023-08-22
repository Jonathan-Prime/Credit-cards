import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioProductoFinancieroComponent } from '../formulario-producto-financiero/formulario-producto-financiero.component';
import { Subscription, map, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ListadoProductosFinancierosService } from '../../services/list-financial-products/listFinancialProducts.service';
import { FinancialProduct } from '../../utils/format-date/formatDate';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UniqueIdValidator } from '../../validators/unique-id.validator';
import { FinancialProductsModel } from '../../types/financialProduct';
import { FinancialProductService } from '../../services/financial-products/financialProducts.service';

@Component({
  selector: 'app-editar-producto-financiero',
  standalone: true,
  templateUrl: './editar-producto-financiero.component.html',
  imports: [CommonModule, FormularioProductoFinancieroComponent],
})
export class EditarProductoFinancieroComponent implements OnInit, OnDestroy {
  formularioProductoFinanciero = new FormGroup({
    id: new FormControl('', {
      asyncValidators: [
        this.uniqueIdValidator.validate.bind(this.uniqueIdValidator),
      ],
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ],
      updateOn: 'blur',
    }),
    logo: new FormControl('', Validators.required),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    dateRelase: new FormControl<string | null>(null, Validators.required),
    dateRevision: new FormControl<string | null>(
      { value: null, disabled: true },
      Validators.required
    ),
  });
  product: FinancialProduct = new FinancialProduct();
  private idSubscription?: Subscription;
  private productId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private listadoProductosFinancierosService: ListadoProductosFinancierosService,
    private productoFinancieroService: FinancialProductService,
    private router: Router,
    private uniqueIdValidator: UniqueIdValidator
  ) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    if (!this.productId) this.router.navigate(['']);
    this.listadoProductosFinancierosService.listadoProductosFiancieros$
      .pipe(
        take(1),
        map((products) =>
          products.filter((product) => product.id === this.productId)
        ),
        tap((product) => {
          if (product.length === 0) {
            this.router.navigate(['']);
          }
          this.product = product[0];
        })
      )
      .subscribe(() => {
        if (this.product) {
          this.updateFormFromResponse(this.product);
        }
      });
  }

  ngOnInit() {
    this.idSubscription = this.formularioProductoFinanciero
      .get('id')
      ?.valueChanges.subscribe((id) => {
        if (id !== this.productId) {
          this.formularioProductoFinanciero.patchValue({ id: this.product.id });
        }
      });
  }
  updateProductoFinanciero(productoFinancieroDTO: FinancialProductsModel) {
    this.productoFinancieroService.updateProductoFinanciero(
      productoFinancieroDTO
    );
  }

  private updateFormFromResponse(productoFinanciero: FinancialProduct) {
    this.formularioProductoFinanciero.setValue({
      id: productoFinanciero.id,
      logo: productoFinanciero.logo,
      name: productoFinanciero.name,
      description: productoFinanciero.description,
      dateRelase: productoFinanciero.dateRelease.toISOString().substring(0, 10),
      dateRevision: productoFinanciero.dateRelease
        .toISOString()
        .substring(0, 10),
    });
    this.formularioProductoFinanciero.get('id')?.disable();
  }

  ngOnDestroy() {
    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
  }
}
