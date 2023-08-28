import { Pipe, PipeTransform } from '@angular/core';
import { CloseModel, PriceData, PriceModel } from 'src/assets/stockmodels';
import { Trace } from 'src/assets/plotlymodels';

@Pipe({
  name: 'closes',
  standalone:true
})
export class StockPriceClosesPipe implements PipeTransform {

  transform(priceDataHash: PriceData): Trace[] {

    let traces: Trace[] = [];
    let tickers:string[] = Object.keys(priceDataHash);
    tickers.forEach( (_ticker:string, _index:number, _tickers:string[]) =>{

      let pricedata:PriceModel[] = [];
      pricedata = priceDataHash[_ticker];
      let closes:CloseModel[] = [];
      closes = pricedata.map(
        (p) => {return {date: p.date, close: p.close } }
      )
      traces.push({x:pricedata.map(d => d.date), y:pricedata.map(d => d.close), mode:"lines", type:"scatter", name:_ticker});
    });
    console.log(traces);
    return traces;
  }

}
