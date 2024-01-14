import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FredComponent } from './fred.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FredComponent', () => {
  let component: FredComponent;
  let fixture: ComponentFixture<FredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports:[FredComponent,BrowserAnimationsModule,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(FredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
