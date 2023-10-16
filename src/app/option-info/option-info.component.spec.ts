import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionInfoComponent } from './option-info.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OptionInfoComponent', () => {
  let component: OptionInfoComponent;
  let fixture: ComponentFixture<OptionInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[OptionInfoComponent,BrowserAnimationsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(OptionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
