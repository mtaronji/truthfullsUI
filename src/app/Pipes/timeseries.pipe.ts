import { Pipe, PipeTransform } from '@angular/core';
import { CloseModel, StockPriceData, StockPrice, Observations, FredData } from 'src/assets/stockmodels';
import { Trace } from 'src/assets/plotlymodels';
import {OptionPrice, OptionPriceData } from 'src/assets/optionmodels';


@Pipe({
  name: 'timeseries',
  standalone:true
})
export class TimeSeriesPipe implements PipeTransform {

  transform(data: StockPriceData | OptionPriceData | FredData, datatype:string): Trace[] {

    let keys = Object.keys(data);
    if (datatype == "option"){
      return optiondatatransform(data);
    }
    else if (datatype == "stock"){
      return stockdatatransform(data);
    }
    else if(datatype =="fred"){
      return fredDatatransform(data)
    }
    else{
      //error
      console.log("Wrong argument specified for datatype. Choices are 'stock' or 'option' ");
      let traces:Trace[] = [];
      return traces;

    }
  }
}

let  optiondatatransform = function(priceDataHash: any):Trace[]
{
  let traces: Trace[] = [];
  let tickers:string[] = Object.keys(priceDataHash);
  tickers.forEach( (_ticker:string, _index:number, _tickers:string[]) =>{

    let pricedata:OptionPrice[] = [];
    pricedata = priceDataHash[_ticker];
    let yaxis:string =`y${_index + 1}`;
    traces.push({x:pricedata.map(d => d.duration), y:pricedata.map(d => d.adjclose), mode:"lines", type:"scatter", name:_ticker, yaxis:yaxis});
  });
  return traces;
}

let stockdatatransform = function(priceDataHash: any):Trace[]
{
  let traces: Trace[] = [];
  let tickers:string[] = Object.keys(priceDataHash);
  tickers.forEach( (_ticker:string, _index:number, _tickers:string[]) =>{

    let pricedata:StockPrice[] = [];
    pricedata = priceDataHash[_ticker];
    let yaxis:string = _index == 0 ? "y" : `y${_index + 1}`;
    traces.push({x:pricedata.map(d => d.date), y:pricedata.map(d => d.adjclose), mode:"lines", type:"scatter", name:_ticker, yaxis:yaxis});
  });
  return traces;
}

let fredDatatransform = function(data:any):Trace[]
{
  let observations:Observations[] = data.observations;
  let series = data.series;
  let traces: Trace[] = [];
 
  traces.push({x:observations.map(d => d.date), y:observations.map(o => o.observation), mode:"lines", type:"scatter",name:series.title});

  return traces;
}
