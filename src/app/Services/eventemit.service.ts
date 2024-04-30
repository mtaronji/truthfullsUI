import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { OptionCodeData, OptionPriceData } from 'src/assets/optionmodels';
import { Observations, StockPriceData, series } from 'src/assets/stockmodels';

@Injectable({
  providedIn: 'root'
})
export class EventemitService {

  public _optionpricedata = new Subject<OptionPriceData>();
  public newOptionPriceData$ = this._optionpricedata.asObservable();

  public _optionCodesData = new Subject<OptionCodeData>();
  public newOptionCodesData$ = this._optionCodesData.asObservable();

  public _stockpricedata = new Subject<StockPriceData>();
  public newStockPriceData$ = this._stockpricedata.asObservable();

  public _isAuthenticated = new Subject<boolean>();
  public AuthenticationChange$ = this._isAuthenticated.asObservable();

  public _selectedTickers= new Subject<string[]>();
  public newSelectedTickers$ = this._selectedTickers.asObservable();

  public _selectedOptionCode= new Subject<string>();
  public newSelectedOptionCode$ = this._selectedOptionCode.asObservable();

  public _datavisual = new Subject<string>();
  public newDataVisual$ = this._datavisual.asObservable();

  public _loginScreen = new Subject<boolean>();
  public showLoginScreen$ = this._loginScreen.asObservable();

  public _fredSeries = new Subject<series>();
  public newFredSeries$ = this._fredSeries.asObservable();

  public _fredData = new Subject<Observations[]>();
  public newFredData$ = this._fredData.asObservable();

  public _databegin = new Subject<string>();
  public newdatabegin$ = this._databegin.asObservable();

  public _traceData = new Subject<any>();
  public newTraceData = this._traceData.asObservable();

  constructor() {
    
   }
}
