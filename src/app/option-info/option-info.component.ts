import { Component, Input, SimpleChanges, OnChanges, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { QuerystringserviceService } from '../Services/querystringservice.service';
import { APIService } from '../Services/api.service';
import { OptionCodeData, OptionPriceData } from 'src/assets/optionmodels';
import { DateTime } from 'luxon';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { EventemitService } from '../Services/eventemit.service';


@Component({
  selector: 'option-info',
  templateUrl: './option-info.component.html',
  styleUrls: ['./option-info.component.css'],
  imports:[
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    FormsModule,
    MatIconModule
  ],
  providers:[QuerystringserviceService, APIService],
  standalone:true
})
export class OptionInfoComponent implements OnInit, AfterViewInit {
  private _tickers:string[];
  
  get Tickers(){
    return this._tickers;
  }
  _selectedRadio:string;
  _optioncodeData:OptionCodeData;
  _optioncodes:string[];
  _selectedticker:string;
  _selectedOptionCode:string;
  _today:string;  
  _filteredoptioncodes:string [];
  _authenticated:boolean;


  ngAfterViewInit(): void {
    this._sharedevents.newSelectedTickers$.subscribe(
      (newtickers:string[])=>{

        newtickers = newtickers.filter(x => !x.startsWith('^'));
        this._tickers = newtickers;
        this.getOptionCodes();     
        this._selectedticker = this.Tickers[0];
        this._optioncodes = this._optioncodeData[this._selectedticker];
        this._filteredoptioncodes = this._optioncodes.filter(this.OptionFilterCall);
        this.PlotOptionPrices();
    });
  }

  constructor(private querystringService:QuerystringserviceService,private apiservice:APIService, private _sharedevents:EventemitService){
    this._tickers = [];
    this._optioncodes = [];
    this._optioncodeData = {};
    this._filteredoptioncodes = [];
    this._selectedticker = "";
    this._selectedOptionCode = "";
    this._today = DateTime.now().toFormat('yy-MM-dd');
    console.log(this._today);
    this._selectedRadio = "Call";  
    this._authenticated = false;
    
  }

  OnOptionCodeChange(e:MatSelectChange){
    this._selectedOptionCode = e.value; 
    this.LoadOptionPrices();
  }
  OnTickerChangeSelect(e:MatSelectChange)
  {
    this._selectedticker = e.value;
    this._optioncodes = this._optioncodeData[this._selectedticker];
    this._filteredoptioncodes = this._optioncodes.filter(this.OptionFilterCall);
    this.PlotOptionPrices();
  }

  PlotOptionPrices(){
  
    this.getClosestMonthlyOptionCode();
    this.LoadOptionPrices();
  }
  onFilterOptionRadio(e:MatRadioChange){
    
    if(e.value == "Call"){
      this._filteredoptioncodes = this._optioncodes.filter(this.OptionFilterCall)

    }
    else if(e.value == "Put"){
      //filter to show puts
      this._filteredoptioncodes = this._optioncodes.filter(this.OptionFilterPut)
    }
    this.getClosestMonthlyOptionCode();

  }


  private OptionFilterPut(optioncode:string, index:number, arr:string[]): boolean{
    //code should be either a 'P'
    let match:boolean = /^.*[0-9]{6}P.*$/.test(optioncode);
    return match

  }

  private OptionFilterCall(optioncode:string, index:number, arr:string[]):boolean{
    //code be a C
    let match:boolean =  /^.*[0-9]{6}C.*$/.test(optioncode);
    return match

  }
  private LoadOptionPrices(){
    let querystring:string = this.querystringService.createQueryString3(this._selectedOptionCode);
    // this.apiservice.getOptionPriceData(querystring)
    // .pipe(
    //   catchError(
    //     (responseError:HttpErrorResponse) =>{
    //       if(responseError.status == 401){
    //         //unauthorized
    //       }
    //       return throwError(() => new Error('Something bad happened; please try again)'))
    //     }
    //   )
    // )
    // .subscribe(
    //     (response:OptionPriceData) => {
    //       this._sharedevents._optionpricedata.next(response);
    //     }     
    //   )
  }
  ngOnInit(): void {
    
  }

  getOptionCodes(){
    
    let querystring:string = this.querystringService.createQueryString2(this.Tickers);

    // this.apiservice.getOptionCodes(querystring)
    // .pipe(
    //   catchError((errorResponse:HttpErrorResponse)=>{
    //     if(errorResponse.status == 401){
    //       //unauthorized
    //     }
    //     return throwError(()=>{new Error("Error getting option Codes")})
    //   })
    // )
    // .subscribe(
    //   (response:OptionCodeData) => {
    //     this._authenticated = true;
    //     this._optioncodeData = response;
    //     this._optioncodes = this._optioncodeData[this._selectedticker];
    //     this._filteredoptioncodes = this._optioncodes.filter(this.OptionFilterCall);
    //     this.getClosestMonthlyOptionCode();
        
    //     this.LoadOptionPrices();
    //   }
    // );
  }

  getClosestMonthlyOptionCode(){
      //regular expression for returning this months option expiration
      const re = new RegExp(this._selectedticker + this._today.replace("-","").slice(0,4) + ".*")

      //find this months monthly option
      let code:string | undefined  = this._filteredoptioncodes.find(
          (c:string) =>{
            return re.test(c);
      });

      code? this._selectedOptionCode = code: this._selectedOptionCode = "";
      
      if (code){
        this._sharedevents._selectedOptionCode.next(this._selectedOptionCode);
      }
  }

}
