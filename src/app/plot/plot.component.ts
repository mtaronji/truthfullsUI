import { AfterViewInit, Component,Input} from '@angular/core';
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
import { catchError, throwError,from , mergeMap, map} from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { ExpressionSettingsDialog,ReturnDialogData } from './plotExpressionSettingsDialog..component';
import { MatDialog} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PapaparseService } from '../Services/papaparse.service';


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
  imports: [PunkLibModule,PlotlyModule,MatTableModule,UpperCasePipe, CommonModule,MatPaginatorModule, MatListModule,MatButtonModule,MatIconModule],
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.scss'
  
})
export class PlotComponent implements AfterViewInit {

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
  tracedata:any[];
  tabledata = new MatTableDataSource<any>();
  layout:Partial<PlotlyJS.Layout>;
  config:Partial<PlotlyJS.Config>;
  headers:string[];
  Expressions: PunkExpression[];
  SelectedExpression:string = "";
  SelectedOptionIndexes:number[] = [];
  PunkErrorMsg:string = "";
  
  constructor(private api:APIService, public dialog:MatDialog, private parser:PapaparseService
  ){
    this.tracedata = [];
    this.data = [];
    this.ViewTable = false;
    this.ViewPlot = false;
    this.paginator = {} as MatPaginator;
    this.headers = [];
    this.Expressions = [];
    this.layout = {} as PlotlyJS.Layout;
    this.config = {} as PlotlyJS.Config;
    

    let config = {
      displayModeBar:false, responsive:true
    }
   
  }
  ngAfterViewInit(): void {
    this.tabledata.paginator = this.paginator;
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
        //this.Expressions = [];
        //this.data = [];
        for(let i = 0; i < expressions.length;i++){
          
          if(expressions[i].results.length == 0){
            this.data.push({type: expressions[i].type, data: expressions[i].results, syntax:`${expressions[i].print} --> No Data Returned`, headers:Object.keys(expressions[i].results)});
           
          }
          else{
            this.data.push({type: expressions[i].type, data: expressions[i].results, syntax:expressions[i].print, headers: Object.keys(expressions[i].results[0])});
          }
          this.Expressions.push({syntax:`${expressions[i].print}`, index:this.Expressions.length});
        }
      },
      error: (err:Error) =>{
        this.PunkErrorMsg = err.message;
      }
    });
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
      this.tracedata.push(result.Trace);
      this.layout = result.Layout;
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