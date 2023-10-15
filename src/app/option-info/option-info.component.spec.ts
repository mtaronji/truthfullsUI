import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionInfoComponent } from './option-info.component';

describe('OptionInfoComponent', () => {
  let component: OptionInfoComponent;
  let fixture: ComponentFixture<OptionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionInfoComponent]
    });
    fixture = TestBed.createComponent(OptionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
