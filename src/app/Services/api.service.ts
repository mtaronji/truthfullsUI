import { Injectable, isDevMode, inject } from '@angular/core';
import { Observable, Subscription, throwError, map, catchError} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/assets/authmodels';
import { PunkInput } from '../plot/plot.component';

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

  private PostHeaders = new Headers();

  constructor(private httpclient:HttpClient) { 
    if(isDevMode()){
      this.URLRoot = "https://localhost:50814";
      this.redirecturl = "http://localhost:4200";
    }
    else{
      this.URLRoot = "";
      this.redirecturl = "";
    }
    this.PostHeaders.append('Content-Type','application/json');
  }
  
  // public getDailyPriceData(querystring:string) : Observable<StockPriceData>{

  //   let url = `${this.URLRoot}/stock/getdailyprices/${querystring}`;
  //   return this.httpclient.get<StockPriceData>(url);
  // }

  public EvaluatePunkInput(evaluationobj:PunkInput):Observable<any>{
    // let encoded = encodeURIComponent(syntax);
    let url = `${this.URLRoot}/interpret`;
    let resultFiles = evaluationobj.csvfiles;

    let data = [{'syntax':evaluationobj.syntax},{'csvfiles':evaluationobj.csvfiles}]
    return this.httpclient.post<any>(url,data,{withCredentials:true});
  }

  
  // public getOptionCodes(querystring:string) : Observable<OptionCodeData>{

  //   let url = `${this.URLRoot}/option/getoptioncodes/${querystring}`;
  //   return this.httpclient.get<OptionCodeData>(url,{withCredentials:true}).pipe(catchError(this.handleError));
  // }

  // public getOptionPriceData(querystring:string) : Observable<OptionPriceData>{

  //   let url = `${this.URLRoot}/option/getDailyOptionPrices/${querystring}`;
  //   return this.httpclient.get<OptionPriceData>(url,{withCredentials:true});
  // }

  // public getWeeklyPriceData(querystring:string): Observable<StockPriceData>{
  //   let url = `${this.URLRoot}/stock/getweeklyprices/${querystring}`;
  //   return this.httpclient.get<StockPriceData>(url);
  // }

  // public getTickers(): Observable<string[]>{
      
  //   let url = `${this.URLRoot}/stock/getalltickers`;
  //   return this.httpclient.get<string[]>(url);
  // }

  // public getEMA(ticker:string, daycount:number){

  // }

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
  public GetAuthenicationDetails():Observable<User>{
    let url = `${this.URLRoot}/account/authenicationdetails`;
    return this.httpclient.get<User>(url, {withCredentials:true}).pipe(catchError(this.handleError)); //include application cookie
  }

  public IsAuthenticated():Observable<boolean>{
    let url = `${this.URLRoot}/account/isauthenticated`;
    return this.httpclient.get<boolean>(url, {withCredentials:true}).pipe(catchError(this.handleError)); //include application cookie
  }
  public externalsignout():Observable<boolean>{
    let url = `${this.URLRoot}/account/externalsignout`;
    return this.httpclient.get<boolean>(url, {withCredentials:true}).pipe(catchError(this.handleError)); //include application cookie
  }

  public PostFeedback(comment:string):Observable<boolean>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    }); 
    let url = `${this.URLRoot}/account/feedback`;  
    return this.httpclient.post<boolean>(url,JSON.stringify(comment), {withCredentials:true,headers:headers}).pipe(catchError(this.handleError)); //include application cookie
  }

  // public getseriesobservations(seriesid:string):Observable<Observations[]>{
  //   let url = `${this.URLRoot}/fred/seriesobservations/${seriesid}`;
  //   return this.httpclient.get<Observations[]>(url).pipe(catchError(this.handleError)); 
  // }

  // public getallseries():Observable<series[]>{
  //   let url = `${this.URLRoot}/fred/getseries`;
  //   return this.httpclient.get<series[]>(url).pipe(catchError(this.handleError)); 
  // }
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
