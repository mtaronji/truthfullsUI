import { Component } from '@angular/core';
import { MultitraceComponent } from '../multitrace/multitrace.component';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FredData, Observations, StockPriceData, series } from 'src/assets/stockmodels';
import { TimeSeriesPipe } from '../Pipes/timeseries.pipe';
import { OptionInfoComponent } from '../option-info/option-info.component';
import {OptionPriceData } from 'src/assets/optionmodels';

import { OhlcPipe } from '../Pipes/ohlc.pipe';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from '../login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ModelComponent } from '../model/model.component';
import {MatDividerModule} from '@angular/material/divider';
import { defaultConfig } from 'src/assets/plotlyconfigs';
import { defaultstocklayout, defaultmodellayout, defaultoptionlayout, defaultfredlayout } from 'src/assets/plotlylayouts';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { EventemitService } from '../Services/eventemit.service';
import { FredComponent } from '../fred/fred.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:true,
  imports:[
    MultitraceComponent,
    PlotlyModule,
    MatProgressSpinnerModule,
    TimeSeriesPipe,
    CommonModule,
    OptionInfoComponent,
    OhlcPipe,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    LoginComponent,
    MatTabsModule,
    ModelComponent,
    MatDividerModule,
    MatSnackBarModule,
    FredComponent
  ]
})
export class DashboardComponent {

  _multitraceloading : boolean;
  _optionchartingloading:boolean;
  _StockData: StockPriceData;
  _OptionPriceData:OptionPriceData;
  _FredObservationData:Observations[];
  _FredSelectedSeries:series;
  _FredData:FredData;
  _tickers:string[];
  _selectedOptionCode:string;
  _visualType:string;
  _authenticated:boolean;

  _stockconfig:any;
  _optionconfig:any;
  _modelconfig:any;
  _stocklayout:any;
  _optionlayout:any;
  _modellayout:any;
  _fredlayout:any;
  _fredconfig:any;



  get OptionPricingData(){
    return this._OptionPriceData;
  }
  constructor(private snackbar:MatSnackBar, private _sharedevents:EventemitService ){
    this._FredData = {observations:[], series:{title:'',units:'',seriesid:''}};

    this._FredSelectedSeries = {title:'', seriesid:'',units:'' };
    this._FredObservationData = [];
    this._multitraceloading = true;
    this._optionchartingloading = true;
    this._StockData = {};
    this._OptionPriceData = {};
    this._tickers = [];
    this._selectedOptionCode = "";
    this._visualType = "ohlc";
    this._authenticated = false;

    this._stockconfig = defaultConfig;
    this._optionconfig = defaultConfig;
    this._modelconfig = defaultConfig;
    this._fredconfig = defaultConfig;

    this._stocklayout = defaultstocklayout;
    this._optionlayout = defaultoptionlayout;
    this._modellayout = defaultmodellayout;
    this._fredlayout = defaultfredlayout;

    //event changes 
    this._sharedevents.newSelectedOptionCode$.subscribe (
      (data:string)=>{
        this._selectedOptionCode = data;
      }
    );

    this._sharedevents.newStockPriceData$.subscribe(
      (data:StockPriceData)=>{
        this.PlotMultiTrace(data);
      }
    );

    this._sharedevents.AuthenticationChange$.subscribe(
      (isautheticated:boolean) =>{
        this.AuthenticationChange(isautheticated);
      }
    );

    this._sharedevents.newOptionPriceData$.subscribe(
      (data:OptionPriceData) => {
        this.PlotOptionPrice(data);
      }
    );
    this._sharedevents.newDataVisual$.subscribe(
      (visual:string)=>{
        this._visualType = visual;
      }
    )

    this._sharedevents.newFredData$.subscribe(
      (response:Observations[])=>{
        this._FredObservationData = response;
        this._FredData.observations = this._FredObservationData;
      }
    );
    this._sharedevents.newFredSeries$.subscribe(
      (series:series) =>{
        this._FredSelectedSeries = series;
        this._FredData.series = series;
        this._fredlayout.title.text =series.title;
        this._fredlayout.yaxis.title = series.units;

      }
    );
  }

  public PlotMultiTrace(stockData:StockPriceData){
    let tickers:string[] = Object.keys(stockData);
    this._stocklayout.title.text = tickers.toString();
    
    this._StockData = stockData;
    this._multitraceloading = false;
  }


  public PlotOptionPrice(optionpricedata:OptionPriceData){
    let optioncodes:string[] = Object.keys(optionpricedata);

    this._optionlayout.title.text = optioncodes.toString();
    this._OptionPriceData = optionpricedata;
    this._optionchartingloading = false;
 
  }

  public GetDataVisual(visualtype:string){
    this._visualType = visualtype;
  }
  public OptionCode(code:string){
    this._selectedOptionCode = code;
  }

  public AuthenticationChange(isauthenticated:boolean){

    this._authenticated = isauthenticated;

    if(isauthenticated){
      this.snackbar.open("You are now logged in", undefined,{duration:3000});
    }
    
  }
  
}

