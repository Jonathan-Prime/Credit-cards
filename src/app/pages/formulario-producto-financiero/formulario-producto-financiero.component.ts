import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnGenericComponent } from '../../utils/button/btnGeneric';
import { UniqueIdValidator } from '../../validators/unique-id.validator';
import { FinancialProductsModel } from '../../types/financialProduct';
import { InputErrorBoxComponent } from '../input-error-box/input-error-box.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formulario-producto-financiero',
  standalone: true,
  templateUrl: './formulario-producto-financiero.component.html',
  styleUrls: ['./formulario-producto-financiero.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BtnGenericComponent,
    InputErrorBoxComponent,
  ],
})
export class FormularioProductoFinancieroComponent
  implements OnInit, OnDestroy
{
  @Input() formularioProductoFinanciero = new FormGroup({
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
  private dateReleaseSubscription?: Subscription;
  constructor(private uniqueIdValidator: UniqueIdValidator) {}

  @Output() submitProducto = new EventEmitter<FinancialProductsModel>();

  ngOnInit(): void {
    this.dateReleaseSubscription = this.formularioProductoFinanciero
      .get('dateRelase')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const date = new Date(value);
          if (date) {
            date.setFullYear(date.getFullYear() + 1);
            const dateAsString = date.toISOString().substring(0, 10);
            this.formularioProductoFinanciero.patchValue({
              dateRevision: dateAsString,
            });
          }
        } else {
          this.formularioProductoFinanciero.patchValue({
            dateRevision: null,
          });
        }
      });
  }

  submit() {
    this.submitProducto.emit(this.formToDTO(this.formularioProductoFinanciero));
  }
  private formToDTO(
    form: FormGroup<{
      id: FormControl<string | null>;
      logo: FormControl<string | null>;
      name: FormControl<string | null>;
      description: FormControl<string | null>;
      dateRelase: FormControl<string | null>;
      dateRevision: FormControl<string | null>;
    }>
  ): FinancialProductsModel {
    const auxDate = new Date();
    const productoFinancieroDTO: FinancialProductsModel = {
      id: form.controls.id.value ?? 'id',
      date_release: form.controls.dateRelase.value ?? auxDate.toISOString(),
      date_revision:
        form.controls.dateRevision.value ??
        new Date(auxDate.getFullYear() + 1).toISOString(),
      description: form.controls.description.value ?? '',
      logo: form.controls.logo.value ?? '',
      name: form.controls.name.value ?? '',
    };
    return productoFinancieroDTO;
  }

  ngOnDestroy(): void {
    if (this.dateReleaseSubscription) {
      this.dateReleaseSubscription.unsubscribe();
    }
  }
}