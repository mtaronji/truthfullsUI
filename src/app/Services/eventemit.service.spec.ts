import { TestBed } from '@angular/core/testing';

import { EventemitService } from './eventemit.service';

describe('EventemitService', () => {
  let service: EventemitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventemitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
