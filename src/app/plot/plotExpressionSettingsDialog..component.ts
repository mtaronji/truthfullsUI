import { AfterViewInit, Component, Inject } from '@angular/core';
import {CommonModule } from '@angular/common';
import {ViewChild } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;
import { MatDialogModule,MatDialogTitle,MatDialogClose,MatDialogActions,MatDialogContent,MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { AppData, DialogInput } from './plot.component';
import { Subject} from 'rxjs';

interface Trace{
    ["OHLC"] : PlotlyJS.OhlcData,
    ["Scatter"] : PlotlyJS.ScatterData,
    ["Bar"] : PlotlyJS.Data,
    ["Pie"] : PlotlyJS.PieData,
    ["Heatmap"] : PlotlyJS.Data,
  }
  
  interface SelectedXYZFields{
    x:string,  //name of the field in data to put in the trace
    xindex:number,
    y:string,   //name of the field in data to put in the trace
    yindex:number,
    z:string,  //name of the field in data to put in the trace
    zindex:number;
    xaxis:string,
    yaxis:string,
  }
  
  interface SelectedOHLCFields{
    X:string,
    xindex:number,
    open:string,  //name of the field in data to put in the trace
    openindex:number;
    high:string,  //name of the field in data to put in the trace
    highindex:number;
    low:string,  //name of the field in data to put in the trace
    lowindex:number;
    close:string,
    closeindex:number;
    decreasecolor:string,
    increasecolor:string,
    xaxis:string,
    yaxis:string,
    line:Partial<PlotlyJS.ScatterLine>,
    dataindex:number;
  }
  export interface ReturnDialogData{
    ViewTable:boolean;
    PlotTraces:boolean;
    Trace:any;
  }
  
  export interface Axis{
     [axis:string] : Partial<PlotlyJS.LayoutAxis>;
  }

@Component({
    selector: 'punk-plot',
    standalone: true,
    imports: [MatDialogModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose, CommonModule,MatExpansionModule,MatFormFieldModule,MatSelectModule,MatButtonModule,FormsModule,MatCheckboxModule,MatInputModule,MatListModule],
    templateUrl: './plotExpressionSettingsDialog.component.html',
    styleUrl: './plot.component.scss'
    
  })
  export class ExpressionSettingsDialog implements AfterViewInit {
    
    SelectedChartIndex:number = 0;
    ChartCountArray:number[] = []; //used to iterate number of charts in the template
    //traces
    SelectedTrace:string;
    TraceNames:string[] = ["candlestick","scatter","scatter3d","bar","pie","heatmap","contour","surface"];
    Trace:Trace;
    ColorScales:string[] = ["Greys","YlGnBu","Greens","YlOrRd","Bluered","RdBu","Reds","Blues","Picnic","Rainbow","Portland","Jet","Hot","Blackbody","Earth","Electric","Viridis","Cividis"];
    SelectedColorScale:string = "Reds";
    SelectedTraceName:string = "";
    //data from Expressions
    SelectedHeader$:Subject<string> = new Subject<string>();
    SelectedHeaders:string[] = [];
    

    //ohlc
    selectedOHLC:SelectedOHLCFields;
    
    ScatterModes:string[] = ["lines", "markers", "lines+markers", "lines+markers+text", "none"];
    SelectedScatterMode:string = this.ScatterModes[0];
    ScatterMarker:Partial<PlotlyJS.ScatterMarker> = {};
    ScatterMarkerLine:Partial<PlotlyJS.ScatterMarkerLine> = {};


    ScatterLineSettings:Partial<PlotlyJS.ScatterLine> = {};
    ScatterLineShapes:string[] = ["linear","spline","hv","vh","hvh","vhv"];
    selectedFields:SelectedXYZFields;
    UseMarker:boolean = false;
  
   //fonts
    FontFamilies:string[] = ["Arial", "Balto", "Courier New", "Droid Sans", "Droid Serif", "Droid Sans Mono", "Gravitas One", "Old Standard TT", "Open Sans", "Overpass", "PT Sans Narrow", "Raleway", "Times New Roman"];
    DefaultFont: Partial<PlotlyJS.Font> = {family:"Arial", size:15, color:"grey"};  
  
    //axis settings 
    XAxes:string[] = ["x", "x2"];
    YAxes:string[] = ["y", "y2"];
    SelectXAxis:string = "";
    SelectYAxis:string = "";
    xChk:boolean = true;  x2Chk:boolean = false;  x3Chk:boolean = false; x4Chk:boolean = false;  
    yChk:boolean = true;  y2Chk:boolean = false;  y3Chk:boolean = false; y4Chk:boolean = false;  
    SelectedRangeStart:Map<string,any> = new Map([
      ["x",""],["x2",""],["x3",""],["x4",""],
      ["y",""],["y2",""],["y3",""],["y4",""]
    ]
    )
    SelectedRangeEnd:Map<string,string> = new Map();
   
  
    AxisDataTypes:string[] = ["-","linear","log","date","category","multicategory"];
    xAxis:Partial<PlotlyJS.LayoutAxis> = {};x2Axis:Partial<PlotlyJS.LayoutAxis> = {};x3Axis:Partial<PlotlyJS.LayoutAxis> = {};x4Axis:Partial<PlotlyJS.LayoutAxis> = {};
    yAxis:Partial<PlotlyJS.LayoutAxis> = {};y2Axis:Partial<PlotlyJS.LayoutAxis> = {};y3Axis:Partial<PlotlyJS.LayoutAxis> = {};y4Axis:Partial<PlotlyJS.LayoutAxis> = {};
    xfont:Partial<PlotlyJS.Font> = {};x2font:Partial<PlotlyJS.Font> = {};x3font:Partial<PlotlyJS.Font> = {};x4font:Partial<PlotlyJS.Font> = {};
    yfont:Partial<PlotlyJS.Font> = {};y2font:Partial<PlotlyJS.Font> = {};y3font:Partial<PlotlyJS.Font> = {};y4font:Partial<PlotlyJS.Font> = {};
    
    
    //legend settings
    LegendLayout:Partial<PlotlyJS.Legend> = {} as PlotlyJS.Legend;
    //layout
    layout:Partial<PlotlyJS.Layout>;
    Dragmodes:string[] = ["zoom", "pan", "select", "lasso", "drawclosedpath", "drawopenpath", "drawline", "drawrect", "drawcircle","orbit","turntable"];
    SelectedDragmode :string = "pan"; //default
    SelectedDataIndex = 0;
  
    //config
  
    @ViewChild(MatAccordion) accordion: MatAccordion;
    constructor(
      public dialogRef: MatDialogRef<ExpressionSettingsDialog>,
      @Inject(MAT_DIALOG_DATA) public input : DialogInput,
    ) {
      if(input.data[0].data[0] == undefined){
        dialogRef.close();
      }
      
      this.ChartCountArray = new Array(Math.min(input.chartcount + 1, 4));   
      this.accordion = {} as MatAccordion;
      this.SelectedTrace = "";
      this.Trace =  {}  as Trace;
      this.selectedFields = {} as SelectedXYZFields;
      this.selectedOHLC = {} as SelectedOHLCFields;
      
      
      this.SelectedHeader$.subscribe({
        next:(h:string) =>{
          let expression = input.data[this.SelectedDataIndex].syntax;
          this.SelectedHeaders.push(`${h} from Expression: ${expression}`);
        }
      });

      this.layout = {} as PlotlyJS.Layout; 
    }
    ngAfterViewInit(): void {
  
      //axis defaults
      this.AxesDefaults();
      //tracedefaults
      this.TraceDefaults();
      this.OHLCDefaults();
      this.SelectedDataIndex = 0;
    }
    private TraceDefaults(){
      this.SelectedTrace = "scatter";
      this.ScatterMarker = {color:'#58508d', opacity:0.5};
      this.ScatterLineSettings = {color:'#003f5c'}
      this.selectedFields.xaxis = this.XAxes[0];
      this.selectedFields.yaxis = this.YAxes[0];
      this.OHLCDefaults();
    }
    private AxesDefaults(){
      this.SelectXAxis = "x";
      this.SelectYAxis = "y";
      this.xAxis.title = "X";this.xAxis.type ="-"; this.xfont = Object.create(this.DefaultFont); this.xAxis.range = [this.SelectedRangeStart.get('x'), this.SelectedRangeEnd.get('x')];
      this.x2Axis.title = "X2";this.x2Axis.type = "-"; this.x2font = Object.create(this.DefaultFont); this.x2Axis.range = [this.SelectedRangeStart.get('x2'), this.SelectedRangeEnd.get('x2')];
      this.yAxis.title = "Y"; this.yAxis.type = "-"; this.yfont = Object.create(this.DefaultFont); this.yAxis.range = [this.SelectedRangeStart.get('y'), this.SelectedRangeEnd.get('y')];
      this.y2Axis.title = "Y2"; this.y2Axis.type = "-"; this.y2font = Object.create(this.DefaultFont); this.y2Axis.range = [this.SelectedRangeStart.get('y2'), this.SelectedRangeEnd.get('y2')];
  
    }
    private OHLCDefaults(){
      this.selectedOHLC.decreasecolor = "#FB607F";
      this.selectedOHLC.increasecolor = "#99EDC3";
      this.selectedOHLC.xaxis = this.XAxes[0];
      this.selectedOHLC.yaxis = this.YAxes[0];
    }
    updateXaxisChks(chk:number){
      if(chk == 1){this.x2Chk = false; this.x3Chk = false; this.x4Chk = false; this.SelectXAxis = "x";}
      if(chk == 2){this.xChk = false; this.x3Chk = false; this.x4Chk = false; this.SelectXAxis = "x2";}
      // if(chk == 3){this.xChk = false; this.x2Chk = false; this.x4Chk = false; this.SelectXAxis = "x"}
      // if(chk == 4){this.xChk = false; this.x2Chk = false; this.x3Chk = false; this.SelectXAxis = "x"}
    }
    updateYaxisChks(chk:number){
      if(chk == 1){this.y2Chk = false; this.y3Chk = false; this.y4Chk = false;this.SelectXAxis = "y";}
      if(chk == 2){this.yChk = false; this.y3Chk = false; this.y4Chk = false; this.SelectXAxis = "y2";}
      // if(chk == 3){this.yChk = false; this.y2Chk = false; this.y4Chk = false;}
      // if(chk == 4){this.yChk = false; this.y2Chk = false; this.y3Chk = false;}
    }
  
    onNoClick(): void {
      this.input.data = [];
      this.dialogRef.close();
    }
  
    onCreatePlot():void{
      let trace = this.CreateTrace();
      this.CreateLayout();
      this.input.data = [];
      this.dialogRef.close({Trace:trace, Layout:this.layout, PlotTraces:true, SelectedChartIndex:this.SelectedChartIndex});
    }
  
    onCreateTable():void{
      this.dialogRef.close({data:this.input.data, PlotTraces:false, ViewTable:true});
    }
  
    CreateTrace():any{
      let trace;
      if(this.SelectedTrace == "candlestick"){
  
        let ohlcTrace:Partial<PlotlyJS.CandlestickData> = {
          type:"candlestick",
          name:this.SelectedTraceName,
          xaxis:this.selectedOHLC.xaxis,       
          //yaxis:this.selectedOHLC.yaxis,
          high:this.input.data[this.selectedOHLC.highindex].data.map((x:any) => x[this.selectedOHLC.high]),
          low:this.input.data[this.selectedOHLC.lowindex].data.map((x:any) => x[this.selectedOHLC.low]),
          close:this.input.data[this.selectedOHLC.closeindex].data.map((x:any) => x[this.selectedOHLC.close]),
          open:this.input.data[this.selectedOHLC.openindex].data.map((x:any) => x[this.selectedOHLC.open]),
          x: this.input.data[this.selectedOHLC.xindex].data.map( (x:any) => x[this.selectedOHLC.X]),
          increasing:{line:{color:this.selectedOHLC.increasecolor}},
          decreasing:{line:{color:this.selectedOHLC.decreasecolor}} ,
          opacity:0.65 
        }
        trace = ohlcTrace;
      }
      else if(this.SelectedTrace == "scatter"){
        this.ScatterMarker.line = this.ScatterMarkerLine;
        let scatterTrace:Partial<PlotlyJS.ScatterData> = {
          type:"scattergl",
          name:this.SelectedTraceName,
          //@ts-ignore
          mode:this.SelectedScatterMode,
          x:this.input.data[this.selectedFields.xindex].data.map( (x:any) => x[this.selectedFields.x]),
          y:this.input.data[this.selectedFields.yindex].data.map( (x:any) => x[this.selectedFields.y]),
         
          xaxis:this.selectedFields.xaxis,
          yaxis:this.selectedFields.yaxis,
          line:this.ScatterLineSettings,
          opacity:0.5,
          marker:this.ScatterMarker
        };
        trace = scatterTrace;
      }
      // else if(this.SelectedTrace == "scatter3d"){
      //   let scatterTrace:Partial<PlotlyJS.ScatterData> = {
      //     type:"scatter3d",
      //     //@ts-ignore
      //     mode:this.SelectedScatterMode,
      //     x:this.data.data.map( (x:any) => x[this.selectedFields.x]),
      //     y:this.data.data.map( (x:any) => x[this.selectedFields.y]),
      //     z:this.data.data.map( (x:any) => x[this.selectedFields.z]),
      //     xaxis:this.selectedFields.xaxis,
      //     yaxis:this.selectedFields.yaxis,
      //     line:this.ScatterLineSettings
      //   };
      //   trace = scatterTrace;
      // }
      else if(this.SelectedTrace == "surface"){
        let surface= {
          type:"surface",
          
          x: this.input.data[this.selectedFields.xindex].data.map((x:any) => x[this.selectedFields.x]),
          y:this.input.data[this.selectedFields.yindex].data.map((x:any) => x[this.selectedFields.y]),
          z: this.input.data[this.selectedFields.zindex].data.map((x:any) => x[this.selectedFields.z]),

          contours: {
            z: {
              show:true,
              usecolormap: true,
              highlightcolor:"#42f462",
              project:{z: true}
            }
          },
          colorscale:this.SelectedColorScale
        };
        trace = surface;
      }
      else if(this.SelectedTrace == "contour"){
        let contour= {
          type:"contour",
          
          x: this.input.data[this.selectedFields.xindex].data.map((x:any) => x[this.selectedFields.x]),
          y:this.input.data[this.selectedFields.yindex].data.map((x:any) => x[this.selectedFields.y]),
          z: this.input.data[this.selectedFields.zindex].data.map((x:any) => x[this.selectedFields.z]),
          colorscale:this.SelectedColorScale
        };
        trace = contour;
      }
      
      return trace;
    }
  
    CreateLayout(){
    
      this.xAxis.color = "#ADD8E6";
      this.yAxis.color = "#ADD8E6";
      this.xAxis.gridcolor = "silver";
      this.yAxis.gridcolor = "silver";

      this.xAxis.range = [this.SelectedRangeStart.get('x'), this.SelectedRangeEnd.get('x')];
      this.x2Axis.range = [this.SelectedRangeStart.get('x2'), this.SelectedRangeEnd.get('x2')];
      this.yAxis.range = [this.SelectedRangeStart.get('y'), this.SelectedRangeEnd.get('y')];
      this.y2Axis.range = [this.SelectedRangeStart.get('y2'), this.SelectedRangeEnd.get('y2')];
      this.xAxis.titlefont = this.xfont;
      this.x2Axis.titlefont = this.x2font;
      this.yAxis.titlefont = this.yfont;
      this.y2Axis.titlefont = this.y2font;
  
      this.layout.xaxis = this.xAxis;
      this.layout.xaxis2 = this.x2Axis;
      this.layout.yaxis = this.yAxis;
      this.layout.yaxis2 = this.y2Axis;
      this.layout.legend = this.LegendLayout;
      this.layout.paper_bgcolor = "#fafafa"; //for light theme
      this.layout.plot_bgcolor = "#fafafa"; //for light theme
      
      var image:Partial<PlotlyJS.Image>;
      image = {
        source: "../../assets/brand-white.png",
        xref: "paper",
        yref: "paper",
        x: 0.50,
        y: 0.50,
        sizex: 0.3,
        sizey: 0.3,
        xanchor:"center",
        yanchor:"middle",
        opacity: 0.05,
        layer: "below"
      }


      //this.layout.images = [image];
      
    }
  }
  