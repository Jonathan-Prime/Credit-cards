import { TestBed } from '@angular/core/testing';

import { UniqueIdValidator } from './unique-id.validator';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormControl } from '@angular/forms';

describe('UniqueIdValidator', () => {
  let service: UniqueIdValidator;
  let client: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UniqueIdValidator);
    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should append id as params and return object on true response', () => {
    const testValue = 'trj-test-id';
    service.validate(new FormControl(testValue)).subscribe((value) => {
      expect(value).toBeTruthy();
    });

    const req = controller.expectOne(
      `${service['baseURL']}?id=${testValue}`
    );
    req.flush({ data: true });
  });

  it('should return null on false response', () => {
    const testValue = 'trj-test-id';
    service.validate(new FormControl(testValue)).subscribe((value) => {
      expect(value).toBeNull();
    });

    const req = controller.expectOne(
      `${service['baseURL']}?id=${testValue}`
    );
    req.flush({ data: false });
  });

  it('should return null on error response', () => {
    const testValue = 'trj-test-id';
    service.validate(new FormControl(testValue)).subscribe((value) => {
      expect(value).toBeNull();
    });

    const req = controller.expectOne(
      `${service['baseURL']}?id=${testValue}`
    );
    req.flush('Error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  afterEach(() => {
    controller.verify();
  });
});
