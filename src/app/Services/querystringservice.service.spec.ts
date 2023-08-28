import { TestBed } from '@angular/core/testing';

import { QuerystringserviceService } from './querystringservice.service';

describe('QuerystringserviceService', () => {
  let service: QuerystringserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuerystringserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
