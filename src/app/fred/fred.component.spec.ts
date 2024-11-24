import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FredComponent } from './fred.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FredComponent', () => {
  let component: FredComponent;
  let fixture: ComponentFixture<FredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [],
    imports: [FredComponent, BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    fixture = TestBed.createComponent(FredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
