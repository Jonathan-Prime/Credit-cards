import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorBoxComponent } from './input-error-box.component';

describe('InputErrorBoxComponent', () => {
  let component: InputErrorBoxComponent;
  let fixture: ComponentFixture<InputErrorBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputErrorBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputErrorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update on error', () => {
    component.error = { required: true };
    fixture.detectChanges();
    expect(component.errorMessage).not.toBeFalsy();
  });

  it('should return empty string on null', () => {
    component.error = null;
    fixture.detectChanges();
    expect(component.errorMessage).toEqual('');
  });
});
