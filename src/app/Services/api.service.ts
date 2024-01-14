import { Injectable, isDevMode, inject } from '@angular/core';
import { Observable, Subscription, throwError, map, catchError} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observations, StockPriceData, series } from 'src/assets/stockmodels';
import { OnInit, OnDestroy } from '@angular/core';
import { OptionCodeData, OptionPriceData } from 'src/assets/optionmodels';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/assets/authmodels';

export interface ErrorModel{
  error:string;//message about error
}

@Injectable({
  providedIn: 'root'
})

//This service will return observables to various get and post requests

export class APIService implements OnDestroy, OnInit {

  private URLRoot:string;
  private redirecturl:string;


  constructor(private httpclient:HttpClient) { 
    if(isDevMode()){
      this.URLRoot = "https://localhost:50814";
      this.redirecturl = "http://localhost:4200";
    }
    else{
      this.URLRoot = "";
      this.redirecturl = "";
    }
  }
  
  public getDailyPriceData(querystring:string) : Observable<StockPriceData>{

    let url = `${this.URLRoot}/stock/getdailyprices/${querystring}`;
    return this.httpclient.get<StockPriceData>(url);
  }

  public getOptionCodes(querystring:string) : Observable<OptionCodeData>{

    let url = `${this.URLRoot}/option/getoptioncodes/${querystring}`;
    return this.httpclient.get<OptionCodeData>(url,{withCredentials:true}).pipe(catchError(this.handleError));
  }

  public getOptionPriceData(querystring:string) : Observable<OptionPriceData>{

    let url = `${this.URLRoot}/option/getDailyOptionPrices/${querystring}`;
    return this.httpclient.get<OptionPriceData>(url,{withCredentials:true});
  }

  public getWeeklyPriceData(querystring:string): Observable<StockPriceData>{
    let url = `${this.URLRoot}/stock/getweeklyprices/${querystring}`;
    return this.httpclient.get<StockPriceData>(url);
  }

  public getTickers(): Observable<string[]>{
      
    let url = `${this.URLRoot}/stock/getalltickers`;
    return this.httpclient.get<string[]>(url);
  }

  public getEMA(ticker:string, daycount:number){

  }

  public isUser() :Observable<boolean> {
    let url = `${this.URLRoot}/account/isuser`;
    return this.httpclient.get<boolean>(url);
  }

  public isSubscriber() :Observable<boolean> {
    let url = `${this.URLRoot}/account/issubscriber`;
    return this.httpclient.get<boolean>(url);
  }

  public externallogin(provider:string):Observable<void>{
    let url = `${this.URLRoot}/account/externallogin?provider=${provider}`;
    return this.httpclient.get<void>(url);
  }
  public isAuthenicated():Observable<User>{
    let url = `${this.URLRoot}/account/isauthenicated`;
    return this.httpclient.get<User>(url, {withCredentials:true}).pipe(catchError(this.handleError)); //include application cookie
  }

  public externalsignout():Observable<boolean>{
    let url = `${this.URLRoot}/account/externalsignout`;
    return this.httpclient.get<boolean>(url, {withCredentials:true}).pipe(catchError(this.handleError)); //include application cookie
  }

  public getseriesobservations(seriesid:string):Observable<Observations[]>{
    let url = `${this.URLRoot}/fred/seriesobservations/${seriesid}`;
    return this.httpclient.get<Observations[]>(url).pipe(catchError(this.handleError)); 
  }

  public getallseries():Observable<series[]>{
    let url = `${this.URLRoot}/fred/getseries`;
    return this.httpclient.get<series[]>(url).pipe(catchError(this.handleError)); 
  }
  public getSMA(ticker:string, daycount:number){

  }
  ngOnInit(): void {
  
  }
  ngOnDestroy(): void {
    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A Network error occurred. :', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

const canActivateOptions: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(APIService).isUser();
    };


const canActivateModels: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(APIService).isSubscriber();
    };
