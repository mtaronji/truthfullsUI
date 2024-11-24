import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PlotComponent } from './plot.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PlotComponent', () => {
  let component: PlotComponent;
  let fixture: ComponentFixture<PlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PlotComponent, BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(PlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
