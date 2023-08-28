import { Component, OnInit, OnDestroy, ElementRef, ViewChild,isDevMode} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { Observable, startWith, map, Subscription } from 'rxjs';
import {MatRadioModule, MatRadioChange } from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule, DatePipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { APIService } from '../Services/api.service';
import { PriceData, PriceModel,  } from 'src/assets/stockmodels';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl,ValidationErrors } from '@angular/forms';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;
import * as plotmodels from 'src/assets/plotlymodels';
import {TimeType} from 'src/assets/stockmodels'
import { QuerystringserviceService } from '../Services/querystringservice.service';
import { StockPriceClosesPipe } from '../Pipes/stock-price-closes.pipe';
import { OhlcPipe } from '../Pipes/ohlc.pipe';



PlotlyModule.plotlyjs = PlotlyJS;


@Component({
  selector: 'app-stockinfo',
  templateUrl: './stockinfo.component.html',
  styleUrls: ['./stockinfo.component.css'],
  standalone:true,
  imports :[
    ReactiveFormsModule,
    MatRadioModule,
    MatAutocompleteModule,
    CommonModule,
    MatDatepickerModule,
    MatLuxonDateModule,
    MatFormFieldModule,
    MatButtonModule,
    PlotlyModule,
    StockPriceClosesPipe,
    OhlcPipe,
    FormsModule
  ],
  providers: [APIService,DatePipe, QuerystringserviceService]
  
})
export class StockinfoComponent implements OnDestroy, OnInit{

  minDate:Date;
  maxDate:Date;
  yearago:string|null;
  today:string|null;
  TimeTypes:string[];
  TimeType:string;
  plotlyid:string;

  @ViewChild("tickerInput") tickerInput! : ElementRef<HTMLInputElement>;
  availableTickers:string[];
  searchBtnDisabled:boolean;
  tickerSelectCtrl:FormControl;
  dateBeginCtrl:FormControl;
  dateEndCtrl:FormControl;

  selectedTicker:string;  
  filteredTickers:Observable<string[]>; //filter tickers for auto complete
  _pricedata:PriceData;
  _traces: plotmodels.OHLCTrace[];


  get PriceData(){
    return this._pricedata;
  }

  get Traces(){
    return this._traces;
  }
  constructor(private webapiservice:APIService, private datepipe:DatePipe, private querystringservice:QuerystringserviceService){
  
    this._traces = [];
    this.plotlyid = "stockinfo-plotly";
    this._pricedata = {};
    this.TimeTypes = ["Daily","Weekly"];
    this.TimeType = this.TimeTypes[0];

    this.searchBtnDisabled = true;

    this.availableTickers =  ["SPY", "TSLA", "NVDA", "AMD", "QQQ", "AMZN", "AAPL", "GOOGL"];
    let today = new Date();
    let yearago = new Date(); yearago.setFullYear(yearago.getFullYear() - 1);
    this.today = datepipe.transform(today, "yyyy-MM-dd");
    this.yearago = datepipe.transform(yearago, "yyyy-MM-dd");
    
    
    this.minDate = new Date("01/01/1929");
    this.maxDate = today;

    //controls
    this.tickerSelectCtrl = new FormControl(
      null, [Validators.required, this.tickerInvalidValidator()]
    );

    this.dateBeginCtrl = new FormControl(
      this.yearago, [Validators.required ]
    );
    this.dateEndCtrl = new FormControl(
      this.today,[Validators.required]
    );

    this.filteredTickers = this.tickerSelectCtrl.valueChanges.pipe(
      startWith(null),
      map( 
        (symbol : string|null) => (symbol? this._filter(symbol) : this.availableTickers.slice()) 
      )
    );
    this.selectedTicker = "SPY";
  }

  Search(){
    if(this.TimeType === "Daily"){
      let querystring:string = this.querystringservice.createQueryString([this.selectedTicker],this.dateBeginCtrl.getRawValue(), this.dateEndCtrl.getRawValue() );
      this.webapiservice.getDailyPriceData(querystring).subscribe(
        (data:PriceData ) => {
           this._pricedata = data;          
        });
    }
    else if(this.TimeType == "Weekly"){
      let querystring:string = this.querystringservice.createQueryString([this.selectedTicker],this.dateBeginCtrl.getRawValue(), this.dateEndCtrl.getRawValue() );
      this.webapiservice.getWeeklyPriceData(querystring).subscribe(
        (data:PriceData ) => {
           this._pricedata = data;            
        });
      
    }
  }
  private _filter(val:string) : string[] {
    return this.availableTickers.filter( symbol => symbol.includes(val.toUpperCase()));
  }

  radioChange(event: MatRadioChange) {
   this.TimeType = event.value;
  }

  tickerInvalidValidator():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !this.availableTickers.includes(control.value);
      return forbidden? {tickerInvalid:{value:control.value} } : null;
    }
  }
  ngOnInit(): void {
 
    if(isDevMode()){
  
      //this._pricedata = {"AAPL":[{"date":"2016-01-04","open":25.6525,"close":26.3375,"adjclose":0,"high":26.342501,"low":25.5,"volume":270597600},{"date":"2016-01-05","open":26.4375,"close":25.6775,"adjclose":0,"high":26.4625,"low":25.602501,"volume":223164000},{"date":"2016-01-06","open":25.139999,"close":25.174999,"adjclose":0,"high":25.592501,"low":24.967501,"volume":273829600},{"date":"2016-01-07","open":24.67,"close":24.112499,"adjclose":0,"high":25.032499,"low":24.1075,"volume":324377600},{"date":"2016-01-08","open":24.637501,"close":24.24,"adjclose":0,"high":24.7775,"low":24.190001,"volume":283192000},{"date":"2016-01-11","open":24.7425,"close":24.6325,"adjclose":0,"high":24.764999,"low":24.334999,"volume":198957600},{"date":"2016-01-12","open":25.137501,"close":24.99,"adjclose":0,"high":25.172501,"low":24.709999,"volume":196616800},{"date":"2016-01-13","open":25.08,"close":24.3475,"adjclose":0,"high":25.297501,"low":24.325001,"volume":249758400},{"date":"2016-01-14","open":24.49,"close":24.879999,"adjclose":0,"high":25.120001,"low":23.934999,"volume":252680400},{"date":"2016-01-15","open":24.049999,"close":24.282499,"adjclose":0,"high":24.4275,"low":23.84,"volume":319335600},{"date":"2016-01-19","open":24.602501,"close":24.165001,"adjclose":0,"high":24.6625,"low":23.875,"volume":212350800},{"date":"2016-01-20","open":23.775,"close":24.1975,"adjclose":0,"high":24.547501,"low":23.355,"volume":289337600},{"date":"2016-01-21","open":24.264999,"close":24.075001,"adjclose":0,"high":24.469999,"low":23.735001,"volume":208646000},{"date":"2016-01-22","open":24.657499,"close":25.355,"adjclose":0,"high":25.365,"low":24.592501,"volume":263202000},{"date":"2016-01-25","open":25.379999,"close":24.860001,"adjclose":0,"high":25.3825,"low":24.8025,"volume":207178000},{"date":"2016-01-26","open":24.9825,"close":24.997499,"adjclose":0,"high":25.219999,"low":24.5175,"volume":300308000},{"date":"2016-01-27","open":24.01,"close":23.355,"adjclose":0,"high":24.157499,"low":23.334999,"volume":533478800},{"date":"2016-01-28","open":23.4475,"close":23.522499,"adjclose":0,"high":23.629999,"low":23.0975,"volume":222715200},{"date":"2016-01-29","open":23.6975,"close":24.334999,"adjclose":0,"high":24.334999,"low":23.5875,"volume":257666000}],"AMD":[{"date":"2016-01-04","open":2.77,"close":2.77,"adjclose":0,"high":2.82,"low":2.63,"volume":32516800},{"date":"2016-01-05","open":2.77,"close":2.75,"adjclose":0,"high":2.8,"low":2.64,"volume":12972300},{"date":"2016-01-06","open":2.66,"close":2.51,"adjclose":0,"high":2.71,"low":2.47,"volume":23759400},{"date":"2016-01-07","open":2.43,"close":2.28,"adjclose":0,"high":2.48,"low":2.26,"volume":22203500},{"date":"2016-01-08","open":2.36,"close":2.14,"adjclose":0,"high":2.42,"low":2.1,"volume":31822400},{"date":"2016-01-11","open":2.16,"close":2.34,"adjclose":0,"high":2.36,"low":2.12,"volume":19629300},{"date":"2016-01-12","open":2.4,"close":2.39,"adjclose":0,"high":2.46,"low":2.28,"volume":17986100},{"date":"2016-01-13","open":2.4,"close":2.25,"adjclose":0,"high":2.45,"low":2.21,"volume":12749700},{"date":"2016-01-14","open":2.29,"close":2.21,"adjclose":0,"high":2.35,"low":2.21,"volume":15666600},{"date":"2016-01-15","open":2.1,"close":2.03,"adjclose":0,"high":2.13,"low":1.99,"volume":21199300},{"date":"2016-01-19","open":2.08,"close":1.95,"adjclose":0,"high":2.11,"low":1.9,"volume":18978900},{"date":"2016-01-20","open":1.81,"close":1.8,"adjclose":0,"high":1.95,"low":1.75,"volume":29243600},{"date":"2016-01-21","open":1.82,"close":2.09,"adjclose":0,"high":2.18,"low":1.81,"volume":26387900},{"date":"2016-01-22","open":2.11,"close":2.02,"adjclose":0,"high":2.17,"low":1.98,"volume":16245500},{"date":"2016-01-25","open":2.01,"close":2.12,"adjclose":0,"high":2.15,"low":2.01,"volume":13080900},{"date":"2016-01-26","open":2.14,"close":2.07,"adjclose":0,"high":2.15,"low":2.03,"volume":11097400},{"date":"2016-01-27","open":2.08,"close":2.13,"adjclose":0,"high":2.18,"low":2.07,"volume":10833200},{"date":"2016-01-28","open":2.16,"close":2.08,"adjclose":0,"high":2.17,"low":2.07,"volume":7118400},{"date":"2016-01-29","open":2.09,"close":2.2,"adjclose":0,"high":2.2,"low":2.07,"volume":11998100}]};
      this.webapiservice.getTickers().subscribe(
        (data:string[]) =>{
          console.log(data);
          this.availableTickers = data;
          this.tickerSelectCtrl.setValue(this.selectedTicker);
        }
      );
  
      this.Search();
    }
    else{
      this.webapiservice.getTickers().subscribe(
        (data:string[]) =>{
          console.log(data);
          this.availableTickers = data;
          this.tickerSelectCtrl.setValue(this.selectedTicker);
        }
      );
  
      this.Search();
    }


  }
  ngOnDestroy(): void {
  
    // this.dailypricesSub.unsubscribe;
    // this.tickersSub.unsubscribe;
    
  }
  destroyPlotly(figure:any, graphDiv:any):void{

  }

}
