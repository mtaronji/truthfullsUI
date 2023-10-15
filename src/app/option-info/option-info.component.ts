import { Component, Input, SimpleChanges, OnChanges, Output, EventEmitter, OnInit } from '@angular/core';
import {MatSelect, MatSelectChange, MatSelectModule} from '@angular/material/select';
import { CommonModule, NgFor } from '@angular/common';
import { QuerystringserviceService } from '../Services/querystringservice.service';
import { APIService } from '../Services/api.service';
import { OptionCodeData, OptionPrice, OptionPriceData } from 'src/assets/optionmodels';
import { DateTime } from 'luxon';



@Component({
  selector: 'option-info',
  templateUrl: './option-info.component.html',
  styleUrls: ['./option-info.component.css'],
  imports:[
    MatSelectModule,
    CommonModule
  ],
  providers:[QuerystringserviceService, APIService],
  standalone:true
})
export class OptionInfoComponent implements OnChanges, OnInit {
  private _tickers:string[];
  @Input('Tickers') set Tickers(tickers:string[]){
    this._tickers = tickers.slice();
  }
  get Tickers(){
    return this._tickers;
  }
  
  _optioncodeData:OptionCodeData;
  _optioncodes:string[];
  _selectedticker:string;
  _selectedOptionCode:string;
  _today:string;
  @Output() NewOptionPriceData = new EventEmitter<OptionPriceData>();
  @Output() NewSelectedOptionCode = new EventEmitter<string>();

  constructor(private querystringService:QuerystringserviceService,private apiservice:APIService){
    this._tickers = [];
    this._optioncodes = [];
    this._optioncodeData = {};
    this._selectedticker = "";
    this._selectedOptionCode = "";
    this._today = DateTime.now().toFormat('yy-MM-dd');
    console.log(this._today);
    
  }

  OnOptionCodeChange(e:MatSelectChange){
    this._selectedOptionCode = e.value;
    this.LoadOptionPrices();

  }
  OnTickerChange(e:MatSelectChange)
  {
    this._selectedticker = e.value;
    this._optioncodes = this._optioncodeData[this._selectedticker];
    this.getClosestMonthlyOptionCode();
    this.LoadOptionPrices();

  }

  private LoadOptionPrices(){

    let querystring:string = this.querystringService.createQueryString3(this._selectedOptionCode);
    this.apiservice.getOptionPriceData(querystring).subscribe(
      (response:OptionPriceData) => {
        this.NewOptionPriceData.emit(response);
    });
  }
  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    //
    let i = 10;
    if(changes['Tickers'] == undefined){
      return;
    }
    else if(!changes['Tickers'].isFirstChange()){

      if(changes['Tickers'].currentValue != changes['Tickers'].previousValue){
        this._selectedticker = this.Tickers[0];   
        this.getOptionCodes(); 
      }

    }
    else if(changes['Tickers'].isFirstChange()){
      this._selectedticker = this.Tickers[0]; 
      this.getOptionCodes(); 
    }
    else{

    }
    
  }

  getOptionCodes(){
    let querystring:string = this.querystringService.createQueryString2(this.Tickers);

    this.apiservice.getOptionCodes(querystring).subscribe(
      (response:OptionCodeData) => {
        this._optioncodeData = response;
        this._optioncodes = this._optioncodeData[this._selectedticker];
        this.getClosestMonthlyOptionCode();
        this.LoadOptionPrices();
      }
    );
  }

  getClosestMonthlyOptionCode(){
      //regular expression for returning this months option expiration
      const re = new RegExp(this._selectedticker + this._today.replace("-","").slice(0,4) + "*")

      //find this months monthly option
      let code:string | undefined  = this._optioncodes.find(
          (c:string) =>{
            return re.test(c);
      });

      code? this._selectedOptionCode = code: this._selectedOptionCode = "";
      
      if (code){
        this.NewSelectedOptionCode.emit(this._selectedOptionCode);
      }
  }

}
