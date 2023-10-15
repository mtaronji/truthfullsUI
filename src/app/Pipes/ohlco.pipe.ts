import { Pipe, PipeTransform } from '@angular/core';
import { OptionPriceData, OptionPrice } from 'src/assets/optionmodels';
import { OHLCTrace } from 'src/assets/plotlymodels';

@Pipe({
  name: 'ohlco',
  standalone:true
})
export class OhlcoPipe implements PipeTransform {

  transform(pricedata:OptionPriceData): OHLCTrace[] {
    let tickers:string[] = Object.keys(pricedata);
    let traces:OHLCTrace[] = [];
    
    tickers.forEach( (_ticker:string, _index:number, _tickers:string[]) =>{
      let prices:OptionPrice[] = pricedata[_ticker];
      let trace:OHLCTrace = {

          close : prices.map(pm => pm.adjclose),
          x: prices.map(pm =>pm.date),
          high: prices.map(pm =>pm.high),
          low: prices.map(pm =>pm.low),
          open: prices.map(pm => pm.open),
          yaxis:"y",
          increasing:{ line:{color: "rgba(100, 200, 102, 0.7)"}},
          type:"ohlc",
          decreasing:{ line:{color:  "rgba(255, 100, 102, 1)"}},
          xaxis:"x",
          name:_ticker
      };
      traces.push(trace);
    });
    return traces;
  }

}
