import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { FormularioProductoFinancieroComponent } from './formulario-producto-financiero.component';
import { provideHttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

describe('FormularioProductoFinancieroComponent', () => {
  let component: FormularioProductoFinancieroComponent;
  let fixture: ComponentFixture<FormularioProductoFinancieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioProductoFinancieroComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioProductoFinancieroComponent);
    component = fixture.componentInstance;
    component.formularioProductoFinanciero = new FormGroup({
      id: new FormControl(''),
      logo: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      dateRelase: new FormControl<string | null>('2020-01-01'),
      dateRevision: new FormControl<string | null>({
        value: null,
        disabled: true,
      }),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return DTO from form', () => {
    const dto = component['formToDTO'](component.formularioProductoFinanciero);
    expect(dto).toBeInstanceOf(Object);
  });

  it('should emit on submit', () => {
    const spy = spyOn(component.submitProducto, 'emit');
    component.submit();
    expect(spy).toHaveBeenCalled();
  });

  it("shouldn't update dateRevision on dateRelease changes", () => {
    const spy = spyOn(component.formularioProductoFinanciero, 'patchValue');
    component.ngOnInit();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update dateRevision when dateRelase changes', fakeAsync(() => {
    const dateRelaseControl = component.formularioProductoFinanciero.get(
      'dateRelase'
    ) as FormControl;
    const dateRevisionControl = component.formularioProductoFinanciero.get(
      'dateRevision'
    ) as FormControl;

    dateRelaseControl.setValue('2023-05-09');
    fixture.detectChanges();
    tick();
    expect(dateRevisionControl.value).toEqual('2024-05-09');
  }));

  it('should update dateRevision when dateRelase changes', fakeAsync(() => {
    const dateRelaseControl = component.formularioProductoFinanciero.get(
      'dateRelase'
    ) as FormControl;
    const dateRevisionControl = component.formularioProductoFinanciero.get(
      'dateRevision'
    ) as FormControl;

    dateRelaseControl.setValue(null);
    fixture.detectChanges();
    tick();
    expect(dateRevisionControl.value).toEqual(null);
  }));
});
