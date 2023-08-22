import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFinancieroComponent } from './producto-financiero.component';

describe('ProductoFinancieroComponent', () => {
  let component: ProductoFinancieroComponent;
  let fixture: ComponentFixture<ProductoFinancieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductoFinancieroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
