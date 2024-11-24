import { TestBed } from '@angular/core/testing';

import { PresetsService } from './presets.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PresetsService', () => {
  let service: PresetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(PresetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
