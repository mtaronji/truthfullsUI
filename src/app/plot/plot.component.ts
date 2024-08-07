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
import { catchError, throwError,from , mergeMap, map, fromEvent, of} from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { ExpressionSettingsDialog,ReturnDialogData } from './plotExpressionSettingsDialog..component';
import { MatDialog} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PapaparseService } from '../Services/papaparse.service';
import { RouterModule } from '@angular/router';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PresetsService } from '../Services/presets.service';

export interface AppData {
  type: string;
  data: any;
  syntax:string;
  headers:string[];
  matrix:any;
}
export interface DialogInput{
  data:Partial<AppData>[];
  chartcount:number;
}
export interface PunkExpression{
  syntax:string,
  index:number
}

export interface PunkInput{
  syntax:string;
  csvfiles:any;
}
@Component({
  selector: 'punk-plot',
  standalone: true,
  imports: [PunkLibModule,PlotlyModule,MatTableModule,UpperCasePipe, CommonModule,MatPaginatorModule, MatListModule,MatButtonModule,MatIconModule,RouterModule, CdkDrag, CdkDragHandle,MatExpansionModule,MatProgressBarModule],
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.scss'
  
})
export class PlotComponent implements AfterViewInit, AfterViewChecked {
  SectorList:string[] = ["XLU","XLK","XLRE","XLI","XLV","XLE","XLP","XLY","XLC","XLF","SMH","XLB"]; //hardcode for now
  CurrentYear = new Date().getFullYear()  
  Loading:boolean = false;
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

  data:Partial<AppData>[]                     //data object can be one of many different values. We will forgoe type checking
  tracedata:any[][];
  // tracedata1:any[] = [];
  // tracedata2:any[] = [];
  // tracedata3:any[] = [];
  // tracedata4:any[] = [];
  // tracedata5:any[] = [];
  // tracedata6:any[] = [];

  tabledata = new MatTableDataSource<any>();
  layout:Partial<PlotlyJS.Layout>[] = [];
  config:Partial<PlotlyJS.Config>[] = [];
  headers:string[];
  Expressions: PunkExpression[];
  SelectedExpression:string = "";
  SelectedOptionIndexes:number[] = [];
  PunkErrorMsg:string = "";
  plt1:string = "plt1";
  plt2:string = "plt2";
  plt3:string = "plt3";
  plt4:string = "plt4";
  totalplots:number = 0;
  constructor(private api:APIService, public dialog:MatDialog, private parser:PapaparseService, private presetservice:PresetsService
  ){
    this.tracedata = [];
    this.tracedata[0] = []; //create arrays for first 2 charts
    this.tracedata[1] = [];

    this.data = [];
    this.ViewTable = false;
    this.ViewPlot = false;
    this.paginator = {} as MatPaginator;
    this.headers = [];
    this.Expressions = [];
    this.Loading = true;
    
    this.config[0] = {
      displayModeBar:false, responsive:true
    }
    this.config[1] = {
      displayModeBar:false, responsive:true
    }
    this.config[2]= {
      displayModeBar:false, responsive:true
    }
    this.config[3] = {
      displayModeBar:false, responsive:true
    }
  }
  ngAfterViewChecked(): void {
  
  }

  ngAfterViewInit(): void {
    
    let initialSector = "SPY";
    this.tabledata.paginator = this.paginator;

    let syntax = this.presetservice.InitialTraces(initialSector, `${this.CurrentYear.toString()}-01-01`);
    let input:PunkInput = {
      syntax:syntax, csvfiles:this.csvFilesData
    }
    this.api.EvaluatePunkInput(input).pipe(catchError(this.PunkError))
    .subscribe({
      next:(expressions:any) =>{  
       
        this.LoadExpressions(expressions);
        this.InitLandingTrace1();
        this.InitMovingAverageAndVixTraces();
        this.InitLandingTrace2();
        this.CreateLayout1(initialSector);
        this.CreateLayout2();
        this.Loading = false;
      },
      error: (err:Error) =>{
        this.PunkErrorMsg = err.message;
        this.Loading = false;
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
    this.Loading = true;
    //send syntax to backend to evaluate   
    this.PunkErrorMsg = "";
    //this.Expressions = [];
    let input:PunkInput = {
      syntax:syntax, csvfiles:this.csvFilesData
    }
    this.api.EvaluatePunkInput(input).pipe(catchError(this.PunkError))
    .subscribe({
      next:(expressions:any) =>{  
        this.LoadExpressions(expressions);
        this.Loading = false;
      },
      error: (err:Error) =>{
        this.Loading = false;
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

    this.tracedata[0].push(ohlcTrace);
  }
  InitMovingAverageAndVixTraces(){
    let sma200:Partial<PlotlyJS.ScatterData> = {
      type:"scatter",
      name:"200 Day SPY SMA",
      xaxis:"x",       
      y:this.data[1].data.map((x:any) => x['adjClose']),
      x: this.data[1].data.map( (x:any) => x['date']),
      opacity:0.65,
      line:{color:'black'}
    }
    let sma100:Partial<PlotlyJS.ScatterData> = {
      type:"scatter",
      name:"100 Day SPY SMA",
      xaxis:"x",       
      y:this.data[2].data.map((x:any) => x['adjClose']),
      x: this.data[2].data.map( (x:any) => x['date']),
      opacity:0.65,
      line:{color:'orange'}
    }
    let ema10:Partial<PlotlyJS.ScatterData> = {
      type:"scatter",
      name:"10 Day SPY EMA",
      xaxis:"x",       
      y:this.data[3].data.map((x:any) => x['adjClose']),
      x: this.data[3].data.map( (x:any) => x['date']),
      opacity:0.65,
      line:{color:'yellow'}
    }
    let vix:Partial<PlotlyJS.ScatterData> = {
      type:"scatter",
      name:"vix",
      xaxis:"x",   
      yaxis:'y2', 
      y:this.data[4].data.map((x:any) => x['adjClose']),
      x: this.data[4].data.map( (x:any) => x['date']),
      opacity:0.65,
      line:{color:'red'}
    }
    this.tracedata[0].push(sma200);
    this.tracedata[0].push(sma100);
    this.tracedata[0].push(ema10);
    this.tracedata[0].push(vix);
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
    let gains:number[] = this.data[5].data.map((x:any) => x['gain']);
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
    this.tracedata[1].push(heatmaptrace);
  }

  CreateLayout1(ticker:string){
    //spy mapped with the daily volatility
      this.layout[0] = {
        autosize:true,
        paper_bgcolor:  "#fafafa", 
        plot_bgcolor: "#fafafa",
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
        yaxis2:{
          autorange: true, 
          type: '-',
          title:'VIX prices',
          overlaying:'y',
          side:'right'
        },
        title:{
          text:`${ticker} YTD With VIX`,
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
    let sectors:string[] = this.data[5].data.map((x:any) => x['sectorETF']);
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
          captureevents:true,
          
        };
        annotations.push(result);
        count++;
      }
    }
    this.layout[1] = {
      autosize:true,
      paper_bgcolor:  "#fafafa", 
      plot_bgcolor: "#fafafa",
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
    let chartcount = this.tracedata.length;
    let input:DialogInput = {
      data:this.data,
      chartcount:chartcount
    }
    const dialogRef = this.dialog.open(ExpressionSettingsDialog, 
      {data:input, autoFocus:true,maxHeight: '90vh' }
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
      if (this.tracedata[result.SelectedChartIndex] === undefined) {this.tracedata[result.SelectedChartIndex] = [];}
      this.tracedata[result.SelectedChartIndex].push(result.Trace); 
      this.layout[result.SelectedChartIndex] = result.Layout;
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
    this.data = [];
  }
  HandleExpandCollapse(){
    window.dispatchEvent(new Event('resize'));
  }

  DeleteChart(chartnumber:number){
    PlotlyJS.purge(`plt${chartnumber}`);
  }

  HeatMapClickEvent(event:any){

    let sector = event.annotation.text; 
    if(!this.SectorList.includes(sector)){return;}

    let syntax = this.presetservice.InitialTraces(sector, `${this.CurrentYear.toString()}-01-01`);
    let input:PunkInput = {
      syntax:syntax, csvfiles:this.csvFilesData
    }
    this.api.EvaluatePunkInput(input).pipe(catchError(this.PunkError))
    .subscribe({
      next:(expressions:any) =>{  
        this.DeleteChart(1); this.DeleteChart(2);
        this.ClearData(); this.tracedata[0] = []; this.tracedata[1] = [];
        this.LoadExpressions(expressions);
        this.InitLandingTrace1();
        this.InitMovingAverageAndVixTraces();
        this.InitLandingTrace2();
        this.CreateLayout1(sector);
        this.CreateLayout2();
        this.Loading = false;
      },
      error: (err:Error) =>{
        this.PunkErrorMsg = err.message;
        this.Loading = false;
      }
    });
  }

}