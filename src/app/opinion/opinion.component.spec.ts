import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionComponent } from './opinion.component';

describe('OpinionComponent', () => {
  let component: OpinionComponent;
  let fixture: ComponentFixture<OpinionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports:[OpinionComponent]
    });
    fixture = TestBed.createComponent(OpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
