import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFinancieroImagenListadoComponent } from './producto-financiero-imagen-listado.component';
import { By } from '@angular/platform-browser';

describe('ProductoFinancieroImagenListadoComponent', () => {
  let component: ProductoFinancieroImagenListadoComponent;
  let fixture: ComponentFixture<ProductoFinancieroImagenListadoComponent>;
  const imageSrcPlaceholder =
    'https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/visa-512.png';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoFinancieroImagenListadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoFinancieroImagenListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render img element if imagenSrc input value is falsy', () => {
    const element = fixture.debugElement;
    component.imagenSrc = '';
    fixture.detectChanges();
    const imageElement = element.query(By.css('img'));
    expect(imageElement).toBeNull();
  });

  it('should render img element if imagenSrc input value is not truthy', () => {
    const element = fixture.debugElement;
    component.imagenSrc = imageSrcPlaceholder;
    fixture.detectChanges();
    const imageElement = element.query(By.css('img'));
    expect(imageElement).toBeTruthy();
  });

  it('should render placeholder div element if imagenSrc input value is falsy', () => {
    const element = fixture.debugElement;
    component.imagenSrc = '';
    fixture.detectChanges();
    const imageElement = element.query(By.css('.placeholder'));
    expect(imageElement).toBeTruthy();
  });

  it('should not render placeholder div element if imagenSrc input value is truthy', () => {
    const element = fixture.debugElement;
    component.imagenSrc = imageSrcPlaceholder;
    fixture.detectChanges();
    const imageElement = element.query(By.css('.placeholder'));
    expect(imageElement).toBeNull();
  });
});
