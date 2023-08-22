import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchbarTablaListadoProductosFinancierosComponent } from './searchbar-tabla-listado-productos-financieros.component';
import { provideHttpClient } from '@angular/common/http';
import { ListadoProductosFinancierosService } from '../../services/list-financial-products/listFinancialProducts.service';
import { By } from '@angular/platform-browser';

describe('SearchbarTablaListadoProductosFinancierosComponent', () => {
  let component: SearchbarTablaListadoProductosFinancierosComponent;
  let fixture: ComponentFixture<SearchbarTablaListadoProductosFinancierosComponent>;
  let listadoProductosFinancierosService: ListadoProductosFinancierosService;

  beforeEach(async () => {
    const listadoProductosFinancierosServiceSpy = jasmine.createSpyObj(
      'ListadoProductosFinancierosService',
      ['updateSearchString']
    );
    await TestBed.configureTestingModule({
      imports: [SearchbarTablaListadoProductosFinancierosComponent],
      providers: [
        provideHttpClient(),
        {
          provide: ListadoProductosFinancierosService,
          useValue: listadoProductosFinancierosServiceSpy,
        },
      ],
    })
      .compileComponents()
      .then(
        () =>
          (listadoProductosFinancierosService = TestBed.inject(
            ListadoProductosFinancierosService
          ))
      );

    fixture = TestBed.createComponent(
      SearchbarTablaListadoProductosFinancierosComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateSearch on input event', () => {
    const element = fixture.debugElement;
    const input = <HTMLInputElement>(
      element.query(By.css('input')).nativeElement
    );
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(
      listadoProductosFinancierosService.updateSearchString
    ).toHaveBeenCalled();
  });
});
