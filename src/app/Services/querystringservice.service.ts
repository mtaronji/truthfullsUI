import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuerystringserviceService {

  constructor() { }

  public createQueryString(tickers:string[], datebegin:string | null, dateend:string | null): string {
    if (datebegin == null){throw "null date begin is not allowed"}
    if (dateend == null){throw "null dateend is not allowed";}
    
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
  public createQueryString2(tickers:string[]): string {

    let querystring : string = "";
    let queryobject:URLSearchParams = new URLSearchParams(); 
    let index = 0;
    tickers.forEach(e => {
      queryobject.append(index.toString(), e);
      index = index + 1;
    });
    querystring = querystring + queryobject.toString();
    return querystring;
  }

  public createQueryString3(optioncode:string): string {

    let querystring : string = "";
    let queryobject:URLSearchParams = new URLSearchParams(); 
    queryobject.append("0", optioncode);
    querystring = queryobject.toString();
    return querystring;
  }
}
