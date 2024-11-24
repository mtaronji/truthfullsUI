import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionInfoComponent } from './option-info.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('OptionInfoComponent', () => {
  let component: OptionInfoComponent;
  let fixture: ComponentFixture<OptionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [OptionInfoComponent, BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    fixture = TestBed.createComponent(OptionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
