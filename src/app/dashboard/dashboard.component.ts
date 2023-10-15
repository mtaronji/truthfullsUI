import { Component, Input } from '@angular/core';
import { MultitraceComponent } from '../multitrace/multitrace.component';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PriceData } from 'src/assets/stockmodels';
import { StockPriceClosesPipe } from '../Pipes/stock-price-closes.pipe';
import { OptionInfoComponent } from '../option-info/option-info.component';
import {OptionPriceData } from 'src/assets/optionmodels';
import { OhlcoPipe } from '../Pipes/ohlco.pipe';
import { OhlcPipe } from '../Pipes/ohlc.pipe';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:true,
  imports:[
    MultitraceComponent,
    PlotlyModule,
    MatProgressSpinnerModule,
    StockPriceClosesPipe,
    OhlcoPipe,
    CommonModule,
    OptionInfoComponent,
    OhlcPipe,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class DashboardComponent {

  _multitraceloading : boolean;
  _optionchartingloading:boolean;
  _StockData: PriceData;
  _OptionPriceData:OptionPriceData;
  _tickers:string[];
  _selectedOptionCode:string;
  _layoutMultitrace:any;


  get OptionPricingData(){
    return this._OptionPriceData;
  }
  constructor(){
    this._multitraceloading = true;
    this._optionchartingloading = true;
    this._StockData = {};
    this._OptionPriceData = {};
    this._tickers = [];
    this._selectedOptionCode = "";

    this._layoutMultitrace = 
    {
      dragmode: 'zoom',
      showlegend: false,
      xaxis: {
        rangeslider: {
         visible: false
       }
      }
    };
  }

  public PlotMultiTrace(stockData:PriceData){
    this._StockData = stockData;
    this._multitraceloading = false
  }

  public PlotOptionPrice(optionpricedata:OptionPriceData){
    this._OptionPriceData = optionpricedata;
    this._optionchartingloading = false;
  }

  public OptionCode(code:string){
    this._selectedOptionCode = code;
  }

  public PlotOptionLoading(){

  }
  public GetSelectedTickers(tickers:string[]){
    this._tickers = tickers;
  }
}

