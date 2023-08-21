import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain header element', () => {
    const element = fixture.debugElement;
    expect(element.query(By.css('header'))).toBeTruthy();
  });

  it('header element should contain an image', () => {
    const element = fixture.debugElement;
    expect(element.query(By.css('header > img'))).toBeTruthy();
  });

  it('should contain main element', () => {
    const element = fixture.debugElement;
    expect(element.query(By.css('main'))).toBeTruthy();
  });
});
