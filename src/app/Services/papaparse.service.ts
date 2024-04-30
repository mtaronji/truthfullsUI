import { Injectable } from '@angular/core';
import Papa from 'papaparse';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PapaparseService {

  constructor() { }

  
  ParseCSVFile(file:any):Observable<Papa.ParseResult<any>>{
    return new Observable( obs => {
      Papa.parse(file, {
        header:true,
        complete:function(results){
          obs.next(results);
        }
      });
    });
  
  }
}
