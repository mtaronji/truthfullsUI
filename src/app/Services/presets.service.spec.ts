import { TestBed } from '@angular/core/testing';

import { PresetsService } from './presets.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PresetsService', () => {
  let service: PresetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(PresetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
