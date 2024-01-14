import { Pipe, PipeTransform } from '@angular/core';
import {OHLCTrace } from 'src/assets/plotlymodels';
import { StockPriceData, StockPrice } from 'src/assets/stockmodels';

import {DefaultCandleIncreaseColors} from 'src/assets/plotlylayouts';
import {DefaultCandleDecreaseColors} from 'src/assets/plotlylayouts';
import { OptionPrice, OptionPriceData, OptionPriceVM } from 'src/assets/optionmodels';

@Pipe({
  name: 'ohlc',
  standalone:true
})
export class OhlcPipe implements PipeTransform {

  transform(pricedata:StockPriceData | OptionPriceData, datatype:string): OHLCTrace[] {

    if (datatype == "stock"){
      return transformstockdata(pricedata);
    }
    else if (datatype == "option"){
      return transformoptiondata(pricedata);
    }
    else{
      let traces:OHLCTrace[] = [];
      console.log("Error. datatype should be 'stock' or 'option'");
      return traces;
    }
  }

}

let transformoptiondata = function(optiondata:any){
  let multipleyaxis:boolean = true;
  let tickers:string[] = Object.keys(optiondata);
  let traces:OHLCTrace[] = [];

  tickers.forEach( (_ticker:string, index:number, tickers:string[]) =>{
    let prices:OptionPriceVM[] = optiondata[_ticker];
    let yaxis:string =`y${index + 1}`;
    let trace:OHLCTrace = {

      close : prices.map(pm => pm.adjclose),
      x: prices.map(pm =>pm.duration),
      high: prices.map(pm =>pm.high),
      low: prices.map(pm =>pm.low),
      open: prices.map(pm => pm.open),
      yaxis:yaxis,
      increasing:DefaultCandleIncreaseColors[index],
      type:"ohlc",
      decreasing:DefaultCandleDecreaseColors[index],
      xaxis:"x",
      name:_ticker,
      opacity:0.55
  };
  traces.push(trace);
  });

  return traces;
}

let transformstockdata = function(stockdata:any){
  let tickers:string[] = Object.keys(stockdata);
  let traces:OHLCTrace[] = [];

  tickers.forEach( (_ticker:string, index:number, tickers:string[]) =>{
    let prices:StockPrice[] = stockdata[_ticker];
    let yaxis:string =`y${index + 1}`;
    let trace:OHLCTrace = {

      close : prices.map(pm => pm.adjclose),
      x: prices.map(pm =>pm.date),
      high: prices.map(pm =>pm.high),
      low: prices.map(pm =>pm.low),
      open: prices.map(pm => pm.open),
      yaxis:yaxis,
      increasing:DefaultCandleIncreaseColors[index],
      type:"ohlc",
      decreasing:DefaultCandleDecreaseColors[index],
      xaxis:"x",
      name:_ticker,
      opacity:0.55
  };
  traces.push(trace);
  });

  return traces;
}