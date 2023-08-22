import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { EditarProductoFinancieroComponent } from './editar-producto-financiero.component';
import { ListadoProductosFinancierosService } from '../../services/list-financial-products/listFinancialProducts.service';
import { FinancialProductService } from '../../services/financial-products/financialProducts.service';
import { UniqueIdValidator } from '../../validators/unique-id.validator';
import { provideHttpClient } from '@angular/common/http';
import { FinancialProduct } from '../../utils/format-date/formatDate';
import { of, tap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditarProductoFinancieroComponent null product id', () => {
  let component: EditarProductoFinancieroComponent;
  let fixture: ComponentFixture<EditarProductoFinancieroComponent>;
  let listadoProductosFinancierosService: ListadoProductosFinancierosService;
  let productoFinancieroService: FinancialProductService;
  let uniqueIdValidator: UniqueIdValidator;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [EditarProductoFinancieroComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        listadoProductosFinancierosService,
        productoFinancieroService,
        UniqueIdValidator,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: null }) } },
        },
      ],
    }).compileComponents();
    productoFinancieroService = TestBed.inject(FinancialProductService);
    uniqueIdValidator = TestBed.inject(UniqueIdValidator);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(EditarProductoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate home if falsy productId', () => {
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});

describe('EditarProductoFinancieroComponent valid id', () => {
  let component: EditarProductoFinancieroComponent;
  let fixture: ComponentFixture<EditarProductoFinancieroComponent>;
  let listadoProductosFinancierosService: ListadoProductosFinancierosService;
  let productoFinancieroService: FinancialProductService;
  let uniqueIdValidator: UniqueIdValidator;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  const productosFinancierosServiceSpy = jasmine.createSpyObj(
    'ProductoFinancieroService',
    ['updateProductoFinanciero']
  );
  const listadoProductosFinancierosServiceSpy = jasmine.createSpyObj(
    'ListadoProductosFinancierosService',
    ['listadoProductosFiancieros$']
  );

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [EditarProductoFinancieroComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        ListadoProductosFinancierosService,
        FinancialProductService,
        UniqueIdValidator,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 'test-id' }) },
          },
        },
        {
          provide: FinancialProductService,
          useValue: productosFinancierosServiceSpy,
        },
      ],
    }).compileComponents();
    productoFinancieroService = TestBed.inject(FinancialProductService);
    uniqueIdValidator = TestBed.inject(UniqueIdValidator);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    listadoProductosFinancierosService = TestBed.inject(
      ListadoProductosFinancierosService
    );
    fixture = TestBed.createComponent(EditarProductoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("shouldn't navigate home if falsy productId", () => {
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call updateProductoFinanciero in ProductoFinancieroService on updateProductoFinanciero', () => {
    const productoFinancieroMock = {
      id: 'trj-crd2',
      name: 'Tarjetas de credito',
      description: 'Tarjeta de consume bajo la modalidad de credito',
      logo: 'https://icons-for-free.com/iconfiles/png/512/Mastercard-1320568127572298248.png',
      date_release: '2023-05-08T19:36:55.124Z',
      date_revision: '2024-05-08T19:36:55.124Z',
    };
    component.updateProductoFinanciero(productoFinancieroMock);
    expect(
      productoFinancieroService.updateProductoFinanciero
    ).toHaveBeenCalled();
  });

  it('shouldn\t trigger on found product id events', () => {
    listadoProductosFinancierosService['listadoProductosFiancieros$'] = of(
      []
    );
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('shouldn\t trigger on found product id events', fakeAsync(() => {
    const productoFinancieroPlaceholder = new FinancialProduct(
      'test-id',
      'nombre-test',
      'descripcion',
      'logo-url',
      new Date('2023-05-09'),
      new Date('2024-05-09'),     
    );
    component.product = productoFinancieroPlaceholder;
    listadoProductosFinancierosService.listadoProductosFiancieros$ = of([
      productoFinancieroPlaceholder,
    ]);

    component.product = productoFinancieroPlaceholder;
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('shouldn\t trigger on found product id events', fakeAsync(() => {
    const productoFinancieroPlaceholder = new FinancialProduct(
      'test-id',
      'nombre-test',
      'descripcion',
      'logo-url',
      new Date('2023-05-09'),
      new Date('2024-05-09'),     
    );
    component.product = productoFinancieroPlaceholder;
    listadoProductosFinancierosService.listadoProductosFiancieros$ = of([
      productoFinancieroPlaceholder,
    ]);

    component.product = productoFinancieroPlaceholder;
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should set product if it exists and update the form', fakeAsync(() => {
    const productoFinancieroPlaceholder = new FinancialProduct(
      'test-id',
      'nombre-test',
      'descripcion',
      'logo-url',
      new Date('2023-05-09'),
      new Date('2024-05-09'),     
    );
    component.product = productoFinancieroPlaceholder;
    listadoProductosFinancierosService.listadoProductosFiancieros$ = of([
      productoFinancieroPlaceholder,
    ]);
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.product).toEqual(productoFinancieroPlaceholder);
  }));

  it('should set product if it exists and update the form', (done: DoneFn) => {
    const productoFinancieroPlaceholder = new FinancialProduct(
      'test-id',
      'nombre-test',
      'descripcion',
      'logo-url',
      new Date('2023-05-09'),
      new Date('2024-05-09'),     
    );
    component.product = productoFinancieroPlaceholder;
    listadoProductosFinancierosService.listadoProductosFiancieros$ = of([
      productoFinancieroPlaceholder,
    ]);
    component.ngOnInit();
    listadoProductosFinancierosService.listadoProductosFiancieros$.subscribe(
      (value) => {
        expect(value[0]).toEqual(productoFinancieroPlaceholder);
        done();
      }
    );
  });

  it('should match productId with product id from response', fakeAsync(() => {
    const matchProduct = new FinancialProduct();
    matchProduct.id = 'test-id';
    const products: FinancialProduct[] = [
      matchProduct,
      new FinancialProduct(),
    ];
    const spy = spyOn<any>(component, 'updateFormFromResponse');
    listadoProductosFinancierosServiceSpy.listadoProductosFiancieros$.and.returnValue(
      of(products).pipe(tap()).subscribe()
    );
    tick();
    component.ngOnInit();
    fixture.detectChanges();
    //expect(spy).toHaveBeenCalled();
    expect(component['productId']).toEqual(products[0].id);
  }));

  it('should call formularioProductoFinanciero.get("id") on updateFormFromResponse', () => {
    spyOn<any>(component, 'updateFormFromResponse');
    const formGetSpy = spyOn(component.formularioProductoFinanciero, 'get');
    component['updateFormFromResponse'](new FinancialProduct());
    fixture.detectChanges();
    expect(formGetSpy).toHaveBeenCalledWith('id');
  });
});
