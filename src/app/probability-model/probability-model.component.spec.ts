import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilityModelComponent } from './probability-model.component';

describe('ProbabilityModelComponent', () => {
  let component: ProbabilityModelComponent;
  let fixture: ComponentFixture<ProbabilityModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ProbabilityModelComponent]
    })
    fixture = TestBed.createComponent(ProbabilityModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
