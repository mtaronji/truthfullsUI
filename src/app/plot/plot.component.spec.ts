import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotComponent } from './plot.component';

describe('PlotComponentComponent', () => {
  let component: PlotComponent;
  let fixture: ComponentFixture<PlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotComponent]
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
