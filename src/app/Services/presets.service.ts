import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Observable } from 'rxjs';

interface PresetData{
  Traces:any[];
  Expressions:any[];
  Result:string;

}
@Injectable({
  providedIn: 'root'
})
export class PresetsService {

  //this service is responsible for returning default chart values for the landing page
  //all chart types and setups should be defined here - even user defined ones.
  constructor(private api:APIService) { }

  public CreateSectorHeatMap(){
    //resturns multiple sector components (XLF, XLV, ...etc) from the s&p
    let syntax = "##stocks{SectorDailyGains()} ";

  }
  

  public InitialTraces(ticker:string, fromdate:string):string{
    //default chart traces will contain prices from the fromdate onwards
    //default chart traces will contain the 8 day EMA, 200 day SMA as well as 100 day SMA
    //default chart traces will also contain the Volatility index
    //return the observable

    let syntax =    `##stocks{GetPrices(\"${ticker}\", \"${fromdate}\")} `
                  + `##stocks{SMA(200,\"${ticker}\", \"${fromdate}\")} `
                  + `##stocks{SMA(100,\"${ticker}\", \"${fromdate}\")} `
                  + `##stocks{EMA(8,\"${ticker}\", \"${fromdate}\")} `
                  + `##stocks{GetPrices(\"^VIX\", \"${fromdate}\")} `
                  + `##stocks{SectorDailyGains("${ticker}")}`;
    return syntax;
                  
    // this.api.EvaluatePunkInput({syntax:syntax, csvfiles:null}).subscribe{
    //   next:()=>{

    //   }
    //   error:()=>{

    //   }
    // }
                    
  }

  public async DefaultChartState(){
    
  }
}
