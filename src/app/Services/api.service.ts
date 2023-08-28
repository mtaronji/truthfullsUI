import { Injectable, isDevMode } from '@angular/core';
import { Observable, Subscription, throwError, map} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PriceData, PriceModel } from 'src/assets/stockmodels';
import { OnInit, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//
export class APIService implements OnDestroy, OnInit {

  URLRoot:string;

  constructor(private httpclient:HttpClient) { 

    if(isDevMode()){
      this.URLRoot = "https://localhost:50814";
    }
    else{
      this.URLRoot = "";
    }
  }
  
  public getDailyPriceData(querystring:string) : Observable<PriceData>{

    let url = `${this.URLRoot}/stock/${querystring}/getdailyprices`;
    return this.httpclient.get<PriceData>(url);
  }
  getWeeklyPriceData(querystring:string): Observable<PriceData>{
    let url = `${this.URLRoot}/stock/${querystring}/getweeklyprices`;
    return this.httpclient.get<PriceData>(url);
  }

  getTickers(): Observable<string[]>{
      
    let url = `${this.URLRoot}/stock/getalltickers`;
    return this.httpclient.get<string[]>(url);
  }

  public getEMA(ticker:string, daycount:number){

  }

  public getSMA(ticker:string, daycount:number){

  }
  ngOnInit(): void {
  
  }
  ngOnDestroy(): void {
    
  }
}
