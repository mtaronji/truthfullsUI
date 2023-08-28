import { Pipe, PipeTransform } from '@angular/core';
import { OHLCTrace } from 'src/assets/plotlymodels';
import { PriceData, PriceModel } from 'src/assets/stockmodels';

@Pipe({
  name: 'ohlc',
  standalone:true
})
export class OhlcPipe implements PipeTransform {

  transform(pricedata:PriceData): OHLCTrace[] {

    let tickers:string[] = Object.keys(pricedata);
    let traces:OHLCTrace[] = [];

    tickers.forEach( (_ticker:string, index:number, tickers:string[]) =>{
      let prices:PriceModel[] = pricedata[_ticker];
      let trace:OHLCTrace = {

        close : prices.map(pm => pm.close),
        x: prices.map(pm =>pm.date),
        high: prices.map(pm =>pm.high),
        low: prices.map(pm =>pm.low),
        open: prices.map(pm => pm.open),
        yaxis:"y",
        increasing:{ line:{color:"#7F7F7F"}},
        type:"ohlc",
        decreasing:{ line:{color:"#17BECF"}},
        xaxis:"x"
    };
    traces.push(trace);
    });

    return traces;
  }

}
