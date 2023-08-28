import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { StockinfoComponent } from './stockinfo.component';
import {MatAutocompleteHarness} from '@angular/material/autocomplete/testing';
import {MatRadioGroupHarness} from '@angular/material/radio/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';
import { TimeType } from 'src/assets/stockmodels';
import { QuerystringserviceService } from '../Services/querystringservice.service';
import { APIService } from '../Services/api.service';



describe('StockinfoComponent', () => {
  let component: StockinfoComponent;
  let fixture: ComponentFixture<StockinfoComponent>;
  let loader:HarnessLoader;
  let datepipe:DatePipe;
  let queryservice:QuerystringserviceService;

  beforeEach(async () => {
      TestBed.configureTestingModule({
      declarations: [],
      imports: [StockinfoComponent, BrowserAnimationsModule, HttpClientTestingModule],providers:[APIService,DatePipe, QuerystringserviceService]
    });
    fixture = TestBed.createComponent(StockinfoComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    datepipe = TestBed.inject(DatePipe);
    queryservice = TestBed.inject(QuerystringserviceService);

    component.availableTickers = ["SPY", "TSLA", "NVDA", "AMD", "QQQ", "AMZN", "AAPL", "GOOGL"];
  });

  afterAll(() => {
    
  });

  it('Component should create successfully', () => {
    expect(component).toBeTruthy();
  });
  
  it('default selected ticker should be SPY', async() => {
    expect(component.selectedTicker).toEqual("SPY");

  });

  it("autocomplete should Create successfully", async () => {
    let autocomplete:MatAutocompleteHarness = await loader.getHarness<MatAutocompleteHarness>(MatAutocompleteHarness);
    expect(autocomplete).toBeTruthy();

  });

  it('Autocomplete should filter Correctly', async() => {
    let autocomplete:MatAutocompleteHarness = await loader.getHarness(MatAutocompleteHarness);
    
    await autocomplete.clear();
    await autocomplete.enterText("SPY");
    expect(await autocomplete.isOpen()).toBeTrue();
    let options = await autocomplete.getOptions();
    expect(options.length).toBe(1);

    await autocomplete.clear();
    await autocomplete.enterText("S");
    options = await autocomplete.getOptions();
    expect(options.length).toBe(2);

    await autocomplete.clear();
    await autocomplete.enterText("AAP");
    options = await autocomplete.getOptions();
    expect(options.length).toBe(1);

  });

  it('Autocomplete should be case insensitive', async() => {
    let autocomplete:MatAutocompleteHarness = await loader.getHarness(MatAutocompleteHarness);
    component.tickerSelectCtrl.setValue(null);
    await autocomplete.clear(); 
    await autocomplete.enterText("spy");
    let options = await autocomplete.getOptions();
    expect(options.length).toBe(1);

    await autocomplete.clear(); 
    await autocomplete.enterText("s");
    options = await autocomplete.getOptions();
    expect(options.length).toBeGreaterThan(0);

    await autocomplete.clear();
    await autocomplete.enterText("aapl"); 
    options = await autocomplete.getOptions();
    expect(options.length).toBe(1);

  });

  it("Autocomplete select should be successful" , async() =>{

    let autocomplete:MatAutocompleteHarness = await loader.getHarness(MatAutocompleteHarness);
    component.tickerSelectCtrl.setValue(null);
    await autocomplete.clear();
    await autocomplete.enterText("NVD");

    await autocomplete.selectOption({text:"NVDA", isSelected:false});
    expect(await autocomplete.isOpen()).toBeFalse();
    expect(component.tickerInput.nativeElement.value).toEqual("NVDA");

  });

  it('Date picker default range is today minus 1 year', async() => {
    let startdate = component.dateBeginCtrl.getRawValue();
    let enddate = component.dateEndCtrl.getRawValue();
    expect(startdate).toEqual(component.yearago);
    expect(enddate).toEqual(component.today);
      
  });

  it('radio select should have  default of daily', async() => {
    expect(component.TimeType).toEqual("Daily");
  });

  it('radio select should work', async() => {
    let radio:MatRadioGroupHarness = await loader.getHarness(MatRadioGroupHarness);
    const buttons = await radio.getRadioButtons();
    const radio_daily = buttons[0]; const radio_weekly = buttons[1];
    expect(await radio_daily.isChecked()).toBeTrue();
    expect(component.TimeType).toEqual("Daily");
    await radio_weekly.check();
    expect(await radio_weekly.isChecked()).toBeTrue();
    expect(component.TimeType).toEqual("Weekly");

  });


});
