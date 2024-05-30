import { AfterViewChecked, AfterViewInit, Component,DoCheck,Input, OnChanges, SimpleChanges} from '@angular/core';
import { PunkLibModule } from 'punk-lib';

import {UpperCasePipe,CommonModule } from '@angular/common';
import {ViewChild } from '@angular/core';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;


import { APIService } from '../Services/api.service';

import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

import {MatListModule, MatListOption, MatSelectionListChange} from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';
import { catchError, throwError,from , mergeMap, map, fromEvent} from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { ExpressionSettingsDialog,ReturnDialogData } from './plotExpressionSettingsDialog..component';
import { MatDialog} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PapaparseService } from '../Services/papaparse.service';
import { RouterModule } from '@angular/router';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';

export interface PunkData {
  type: string;
  data: any;
  syntax:string;
  headers:string[];
  matrix:any;
}
export interface PunkExpression{
  syntax:string,
  index:number
}

export interface PunkSyntaxObject{
  syntax:string;
  csvfiles:any;
}
@Component({
  selector: 'punk-plot',
  standalone: true,
  imports: [PunkLibModule,PlotlyModule,MatTableModule,UpperCasePipe, CommonModule,MatPaginatorModule, MatListModule,MatButtonModule,MatIconModule,RouterModule, CdkDrag, CdkDragHandle],
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.scss'
  
})
export class PlotComponent implements AfterViewInit, AfterViewChecked {
 
  DataUsage:number = 0;
  ViewTable:boolean;
  ViewPlot:boolean;
  SelectedFiles:File[] = [];
  csvfiledata:any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  csvFilesData:any[][] = [];
  @Input() set NewCSVFileUpload(data:any){
    
    if(data.length == 0 || data == undefined){return;}
   
   
  }

  data:Partial<PunkData>[]                     //data object can be one of many different values. We will forgoe type checking
  tracedata:any[][];
  tracedata1:any[] = [];
  tracedata2:any[] = [];
  tracedata3:any[] = [];
  tracedata4:any[] = [];
  tracedata5:any[] = [];
  tracedata6:any[] = [];

  tabledata = new MatTableDataSource<any>();
  layout1:Partial<PlotlyJS.Layout>;
  layout2:Partial<PlotlyJS.Layout>;
  layout3:Partial<PlotlyJS.Layout>;
  layout4:Partial<PlotlyJS.Layout>;
  config1:Partial<PlotlyJS.Config>;
  config2:Partial<PlotlyJS.Config>;
  config3:Partial<PlotlyJS.Config>;
  config4:Partial<PlotlyJS.Config>;
  headers:string[];
  Expressions: PunkExpression[];
  SelectedExpression:string = "";
  SelectedOptionIndexes:number[] = [];
  PunkErrorMsg:string = "";
  plt1:string = "plt1";
  plt2:string = "plt2";
  constructor(private api:APIService, public dialog:MatDialog, private parser:PapaparseService
  ){
    this.tracedata = [];
    this.data = [];
    this.ViewTable = false;
    this.ViewPlot = false;
    this.paginator = {} as MatPaginator;
    this.headers = [];
    this.Expressions = [];
    this.layout1 = {} as PlotlyJS.Layout;
    this.layout2 = {} as PlotlyJS.Layout;
    this.layout3 = {} as PlotlyJS.Layout;
    this.layout4 = {} as PlotlyJS.Layout;

    
    this.config1 = {
      displayModeBar:false, responsive:true
    }
    this.config2 = {
      displayModeBar:false, responsive:true
    }
    this.config3= {
      displayModeBar:false, responsive:true
    }
    this.config4 = {
      displayModeBar:false, responsive:true
    }
  }
  ngAfterViewChecked(): void {
  
  }

  ngAfterViewInit(): void {
   
    this.tabledata.paginator = this.paginator;

    //init landing data
    let syntax = "##stocks{GetPrices(\"SPY\", \"2024-01-01\")} ##stocks{SectorDailyGains()}";
    let obj:PunkSyntaxObject = {
      syntax:syntax, csvfiles:this.csvFilesData
    }
    this.api.EvaluatePunkSyntax(obj).pipe(catchError(this.PunkError))
    .subscribe({
      next:(expressions:any) =>{  
        this.LoadExpressions(expressions);
        this.InitLandingTrace1();
        this.InitLandingTrace2();
        this.CreateLayout2();
        this.CreateLayout1();
      
      },
      error: (err:Error) =>{
        this.PunkErrorMsg = err.message;
      }
    });

    fromEvent(document,'mouseup').subscribe({
      next:()=>{
        window.dispatchEvent(new Event('resize'));
      }
    });
    fromEvent(document,'mousedown').subscribe({
      next:()=>{
        window.dispatchEvent(new Event('resize'));
      }
    });
  }

  NewSyntax(syntax:string):void{

    //send syntax to backend to evaluate   
    this.PunkErrorMsg = "";
    //this.Expressions = [];
    let obj:PunkSyntaxObject = {
      syntax:syntax, csvfiles:this.csvFilesData
    }
    this.api.EvaluatePunkSyntax(obj).pipe(catchError(this.PunkError))
    .subscribe({
      next:(expressions:any) =>{  
        this.LoadExpressions(expressions);
      },
      error: (err:Error) =>{
        this.PunkErrorMsg = err.message;
      }
    });
  }

  LoadExpressions(expressions:any){
    for(let i = 0; i < expressions.length;i++){
          
      let syntax = "";
      if(expressions[i].results.length == 0){
        syntax = "Query didn't return data";
        //this.data.push({type: expressions[i].type, data: expressions[i].results, syntax:`${syntax}`, headers:Object.keys(expressions[i].results)});           
      }
      else{
        syntax = expressions[i].print;
        this.data.push({type: expressions[i].type, data: expressions[i].results, syntax:syntax, headers: Object.keys(expressions[i].results[0])});      
      }
      this.Expressions.push({syntax:`${syntax}`, index:this.Expressions.length});
    }
  }

  InitLandingTrace1(){
    let ohlcTrace:Partial<PlotlyJS.CandlestickData> = {
      type:"candlestick",
      name:"SPY",
      xaxis:"x",       
      high:this.data[0].data.map((x:any) => x['high']),
      low:this.data[0].data.map((x:any) => x['low']),
      close:this.data[0].data.map((x:any) => x['adjClose']),
      open:this.data[0].data.map((x:any) => x['open']),
      x: this.data[0].data.map( (x:any) => x['date']),
      increasing:{line:{color:'green'}},
      decreasing:{line:{color:'ren'}} ,
      opacity:0.65 
    }
    this.tracedata[0] = [];
    //this.tracedata[0].push(ohlcTrace);
    this.tracedata1 = [ohlcTrace];
  }
  InitLandingTrace2(){
    let colorscale = [
      ['0.0','#8B0000'],
      ['0.0','#8B0000'],
      ['0.25','#FFC0CB'],
      ['0.25','#FFC0CB'],
      ['0.5','#E5E4E2'],
      ['0.5','#E5E4E2'],
      ['0.75','#AFE1AF'],
      ['0.75','#AFE1AF'],
      ['1.0','#006400'],
      ['1.0','#006400']
    ];
    let gains:number[] = this.data[1].data.map((x:any) => x['gain']);
    let heatmaptrace:any= {
      type: 'heatmap',
      hoverongaps: false,
      colorscale: colorscale,
      z: [ 
          [gains[0]* 100, null,null],
          [gains[1]* 100,gains[2]* 100, gains[3]* 100],
          [gains[4]* 100,gains[5]* 100, gains[6]* 100],
          [gains[7]* 100, gains[8]* 100,gains[9]* 100],
          [gains[10]* 100,gains[11]* 100,gains[12]* 100],
          [gains[13]* 100,gains[14]* 100,gains[15]* 100],
          [gains[16]* 100,gains[17]* 100,gains[18]* 100],
          [gains[19]* 100,gains[20]* 100,gains[21]* 100],
          [gains[22]* 100,gains[23]* 100,gains[24]* 100]  
          ],
      x: ['1','2','3'],
      y: ['1','2','3','4','5','6','7','8','9'],

      zmin: -2,
      zmax: 2,
    }
    this.tracedata[1] = [];
    this.tracedata[1].push(heatmaptrace);
    this.tracedata2 = [heatmaptrace];
  }

  CreateLayout1(){
    //spy mapped with the daily volatility
      this.layout1 = {
        autosize:true,
        xaxis: {
          autorange: true, 
          title: 'Date', 
          type: '-',
          rangeslider:{visible:false}
        }, 
        yaxis: {
          autorange: true, 
          type: '-',
          title:'Prices'
        },      
        title:{
          text:"SPY YTD",
          font:{
            size:25,
            family:"Gravitas One",
            color:"black"
          }
        } 
      } 
  }
  CreateLayout2(){
    //sector heatmap
    let sectors:string[] = this.data[1].data.map((x:any) => x['sectorETF']);
    let annotations: Partial<PlotlyJS.Annotations>[] = [];
    let count = 0;
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 3;j++){
        if(i == 0 && j > 0){continue;}
        var result:any = {
          xref: 'x1',
          yref: 'y1',
          x: `${j + 1}`,
          y: `${i + 1}`,
          text: sectors[count],
          font: {
            family: 'Arial',
            size: 12,
            color: 'white'
          },
          showarrow: false,
        };
        annotations.push(result);
        count++;
      }
    }
    this.layout2 = {
      autosize:true,
      xaxis: {
        showgrid: false,
        showline: false,
        zeroline:false,
        visible:false,
        type:'linear',
        rangeslider:{visible:false}
        
      },
      yaxis: {
        showgrid: false,
        showline: false,
        zeroline:false,
        type:'linear',
        visible:false
      },    
      title:{
        text:"Sector Heat Map",
        font:{
          size:25,
          family:"Gravitas One",
          color:"black"
        }
      }, 
      annotations:annotations
    } 
  }
  PunkError(response:HttpErrorResponse){
    let msg:string;
    if(response.status === 400 || response.status === 500){
      return throwError(() => new Error(response.error));
    }
    
    return throwError(() => new Error(response.error));
  }
  OnSelectExpressionChange($event:MatSelectionListChange, Selection:SelectionModel<MatListOption>){   
    this.OpenExpressionSettings();
  }

  OpenExpressionSettings(){
    const dialogRef = this.dialog.open(ExpressionSettingsDialog, 
      {data:this.data, autoFocus:true,maxHeight: '90vh' }
    );

    dialogRef.afterClosed().subscribe(result => {
      
    if(result == undefined){
        return;
      }
      this.onClose(result);     
    });
  }

  onClose(result:any){
    if(result.PlotTraces == true){
      let size = this.tracedata.length;
      this.tracedata[size] = [];
      this.tracedata[size].push(result.Trace); 
      if(size == 0){
        this.layout1 = result.Layout;
      }
      else if(size == 1){
        this.layout2 = result.Layout;
      }
      else if(size == 2){
        this.layout3 = result.Layout;
      }
      else if(size == 3){
        this.layout4 = result.Layout;
      }
      
      this.ViewPlot = true;
    }
    if(result.ViewTable == true){
      this.CreateTable(result); 
      this.ViewTable = true;
    }
  }

  CreateTable(data:ReturnDialogData){
    //this.headers = Object.keys(data.punkData.data[0]);
  }
  openDialog(): void {
  
  }

  onFileSelected(event: any): void {
    this.SelectedFiles = Array.from(event.target.files);
    event.target.value = null;
    from(this.SelectedFiles).pipe(
    mergeMap((f,i) => {
      return this.parser.ParseCSVFile(f).pipe(map((result,index) =>({result:result,index:i})))
    }), catchError(this.HandleCSVFileParseError))
    .subscribe({
        next:({result, index}) =>{
          this.csvFilesData.push(result.data);
          this.data.push({type: "FileInput", data: result.data, syntax:`---->F${index} ${this.SelectedFiles[index].name} Input`, headers:Object.keys(result.data[0])});    
          this.Expressions.push({syntax:`--->F${index} Input ${this.SelectedFiles[index].name}`, index:this.Expressions.length});
        },
        error:x =>{
          console.log("had an error");
        },
        complete:() =>{
          console.log("Completed parsing csvfiles");
        }
    });
   
  }

  HandleCSVFileParseError(err:any){
    console.log("error");
    return throwError(() => new Error('Error in the observable'));
  }

  ClearData(){
    this.tracedata = [];
    this.csvFilesData = [];
    this.SelectedFiles = [];
    this.Expressions = [];
  }


}