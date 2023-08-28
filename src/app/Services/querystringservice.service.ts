import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuerystringserviceService {

  constructor() { }

  public createQueryString(tickers:string[], datebegin:string, dateend:string): string {
    let querystring : string = "";
    let queryobject:URLSearchParams = new URLSearchParams(); 
    let index = 0;
    tickers.forEach(e => {
      queryobject.append(index.toString(), e);
      index = index + 1;
    });
    queryobject.append("datebegin",datebegin);
    queryobject.append("dateend",dateend);
    querystring = querystring + queryobject.toString();
    return querystring;
  }
}
