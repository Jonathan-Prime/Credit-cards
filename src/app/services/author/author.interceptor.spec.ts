import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './author.interceptor';

describe('AuthorInterceptor', () => {
  let client: HttpClient;
  let controller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should add authorId header to request', () => {
    client.get('/test').subscribe();
    const request = controller.expectOne('/test');
    expect(request.request.headers.has('authorId')).toBeTrue();
  });
});
