import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, isDevMode } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { MatChipsModule, MatChipGrid} from '@angular/material/chips';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

import { Observable, startWith, map } from 'rxjs';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { APIService } from '../Services/api.service';
import { PriceData } from 'src/assets/stockmodels';
import { CommonModule } from '@angular/common';
import { StockPriceClosesPipe } from '../Pipes/stock-price-closes.pipe';
import { QuerystringserviceService } from '../Services/querystringservice.service';


@Component({
  selector: 'Multitrace',
  templateUrl: './Multitrace.component.html',
  styleUrls: ['./Multitrace.component.css'],
  imports:[
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTabsModule,
    PlotlyModule,
    CommonModule,
    StockPriceClosesPipe
  ],
  providers:[APIService, QuerystringserviceService],
  standalone:true
})

export class MultitraceComponent implements OnInit, AfterViewInit {
  title = "MultiTrace";
  DEVELOPMENT:boolean = false;
  private MAXCHIPSIZE:number = 4;
  _title : string = "Multi Trace";
  _allTickers :string[];
  _tickerForm: FormGroup;
  _tickerCtrl: FormControl;
  _startDateCtrl: FormControl;
  _endDateCtrl: FormControl;
  _SelectedTickers:string[];
  _filteredTickers: Observable<string[]> | undefined;
 
  @ViewChild(MatChipGrid) chipGrid: MatChipGrid | undefined; 
  @ViewChild('tickerInput') tickerInput: ElementRef<HTMLInputElement> | undefined;
  _chartVisible:boolean;
  _mindate:Date;
  _maxdate:Date;
  _pricedata:PriceData; //from api
  
  //properties
  get ticker() {

    return this._tickerForm.get('tickerSelected');
  }

  get MultiTraceData(){
    return this._pricedata;

  }
  get tickerform(){
      return this._tickerForm; 
  }
  
  get StartDate(){
      return this._tickerForm.get('dateStart');
  }
  get EndDate(){
    return this._tickerForm.get('dateEnd');
  }

  get ChartVisible(){
    return this._chartVisible;
  }

  ngOnInit(): void {
    this._SelectedTickers.push("SPY", "QQQ"); this._tickerCtrl.markAsTouched;
    this.pullData();
  }
  
  ngAfterViewInit(): void {
 

  }

  constructor(private apiservice:APIService, private querystringservice:QuerystringserviceService){
    this.DEVELOPMENT = isDevMode();
    this._chartVisible = true;
    this._allTickers = [];
    this._SelectedTickers = [];
    this._mindate = new Date("1930-01-01");
    this._maxdate = new Date(); //current date
    const currentDate = new Date(this._maxdate);
    const yearago = new Date(currentDate); yearago.setMonth(currentDate.getMonth() - 12);

    this._pricedata = {}

    this._tickerCtrl = new FormControl(null,
      [    
        this.TickerInputValidator()
      ]
     );
     this._startDateCtrl = new FormControl<Date | null>(yearago,
      Validators.required);
     this._endDateCtrl = new FormControl<Date | null>(currentDate,
      Validators.required);

    this._tickerForm = new FormGroup(
    {
        tickerSelected: this._tickerCtrl,
        dateStart: this._startDateCtrl,
        dateEnd: this._endDateCtrl
    });   
    
    //create the filtered autocomplete
    this._filteredTickers = this.ticker?.valueChanges.pipe(
      startWith(null), 
      map( (ticker:string|null ) => (ticker? this.filterTicker(ticker.toUpperCase()): this._allTickers.slice() ))
    );

    this.getTickersAsync();
  }
   private filterTicker(value : string):string[]{
    return this._allTickers.filter(t => t.includes(value));
   }
  //when removed is clicked, remove the ticker from the selection
  removeTicker(ticker:string): void{
    const index = this._SelectedTickers.indexOf(ticker);

    if (index >= 0){
      this._SelectedTickers.splice(index,1);
    }

  }

  //this event happens when you click enter
  addTicker(){

  }
  //this is the event that happens when you click the auto select
  selected(event: MatAutocompleteSelectedEvent):void {
    if(!this._SelectedTickers.includes(event.option.viewValue)){

      if (this._SelectedTickers.length >= this.MAXCHIPSIZE){
        this._SelectedTickers[this.MAXCHIPSIZE - 1] = event.option.viewValue;
      }
      else{
        this._SelectedTickers.push(event.option.viewValue);
        this._tickerCtrl.reset();
        this._tickerCtrl.setValue(null);
        
        if (!(this.tickerInput?.nativeElement.value === undefined)){this.tickerInput.nativeElement.value = "";}
    
      }
    }
  }

  pullData(){
    
    const datebegin = this.ExtractDate(this.StartDate?.value);
    const dateend = this.ExtractDate(this.EndDate?.value);
    let querystring = this.querystringservice.createQueryString(this._SelectedTickers, datebegin, dateend);
    //create the observable and subscribe. 
    this.apiservice.getDailyPriceData(querystring).subscribe( (response:PriceData) => {
        this._pricedata = response;
      }
    );
    
  }
  
  
  TickerInputValidator() : ValidatorFn{
    return (control: AbstractControl): {[key:string]: any} | null => 
      {
        return (this._SelectedTickers.length == 0) ? {TickersEmpty: {value: "No tickers in the chip grid" }} : null;
      }
  }

  //extracts a date from our control. Expects date input from datepicker.
  private ExtractDate (date:object):string {
    return JSON.stringify(date).substring(1,11);
  }


  private async getTickersAsync(){
    this.apiservice.getTickers().subscribe(
      (data:string[]) =>{
        this._allTickers = data;
      }
    );
   
  }
  private async GetWeeklyPrices(){
    
  }

}