import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { MultitraceComponent } from './multitrace.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('MultitraceComponent', () => {
  let component: MultitraceComponent;
  let fixture: ComponentFixture<MultitraceComponent>;
  let loader:HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [], 
      imports:[MultitraceComponent,BrowserAnimationsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(MultitraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    component._allTickers = ['SPY', 'QQQ', 'AMD', 'TSLA', 'NVDA', 'AMZN'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Autocomplete should open when text is typed', async () => {    
    let autocomplete = await loader.getHarness(MatAutocompleteHarness);
    await autocomplete.enterText('Q');
    expect(await autocomplete.isOpen()).toBeTrue();

  });
  it('Autocomplete filter should work ', async() => {
    let autocomplete = await loader.getHarness(MatAutocompleteHarness);
    await autocomplete.enterText('Q');
    let options = await autocomplete.getOptions();
    const ticker = await options[0].getText();
    expect(ticker).toBe('QQQ');
    await autocomplete.clear();
    await autocomplete.enterText("S");
    options = await autocomplete.getOptions();
    expect(options.length).toEqual(2);
  });

  it('chip grid default should be SPY', async()=>{

  });
  
  it('expect chip grid to work', async()=>{

  });

  it('expect search button to work', async()=>{

  });
  it('expect pricedata to bind correctly', async()=>{

  });

  // it('', async() => {
  //   await autocomplete.selectOption({text:'QQQ'});
  //   expect(await autocomplete.isOpen()).toBeFalse();
  //   expect(component._SelectedTickers[1]).toEqual('QQQ');
  //   expect(component._SelectedTickers[0]).toEqual('SPY');

  // });


});