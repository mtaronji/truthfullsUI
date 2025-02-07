
//models used for creating plotly graphing models
export interface Trace{
    x: string[] | number[] | Date[];
    y: string[] | number[] | Date[];
    z?: string[] | number[] | Date[];
    mode:string;
    type:string;
    name:string;
    yaxis?:string;
    marker?:Marker;
    line?:Line;
}
export interface PlotlyMultiTraceModel{
    traces :Trace[];
    layout :Layout;
    config :Config;
}

export interface Layout{
    title?:Title;
    xaxis?:layout_axis;
    yaxis?:layout_axis;
    yaxis2?:layout_axis;
    yaxis3?:layout_axis;
    yaxis4?:layout_axis;
    yaxis5?:layout_axis;
    yaxis6?:layout_axis;
    yaxis7?:layout_axis;
    yaxis8?:layout_axis;
    yaxis9?:layout_axis;
    yaxis10?:layout_axis;
    autosize?: boolean;
    showlegend?:boolean; 
    plot_bgcolor?:string;
    paper_bgcolor?:string;

}

export interface Config{
    responsive?:boolean;
    displayModeBar?:boolean;
}

export interface layout_axis{

    title?:string;
    type?:string;
    showgrid?:boolean;
    rangeslider?:Rangeslider;
    titlefont?:Font;
    tickfont?:Font;
    overlaying?:string;
    anchor?:string;
    side?:string;
    domain? :number[];
    autorange?:boolean;
}

export interface Title{
    automargin?:boolean;
    font?:Font;
    text?:string;
}
export interface Font{
    color?:string;
    family?:string;
    size?:number;
}

export interface Rangeslider{
    visible?:boolean;
}

export interface Marker{
    color:string;
    size:number;
}
export interface Line{
    color:string;
    width?:number
}

export interface TickFont{
    color:string;
}

export interface OHLCTrace{
    x:string[] | number[]; //dates or duration
    close:number[];
    high:number[];
    low:number[];
    open:number[];
    increasing:Increasing;
    decreasing:Decreasing;
    type:string;
    xaxis:string;
    yaxis:string;
    name?:string;
    opacity?:number;
}

export interface Increasing{
    line:Line;
}

export interface Decreasing{
    line:Line;

}




// var trace1 = {
  
//     x: ['2017-01-17', '2017-01-18', '2017-01-19', '2017-01-20', '2017-01-23', '2017-01-24', '2017-01-25', '2017-01-26', '2017-01-27', '2017-01-30', '2017-01-31', '2017-02-01', '2017-02-02', '2017-02-03', '2017-02-06', '2017-02-07', '2017-02-08', '2017-02-09', '2017-02-10'], 
    
//     close: [120, 119.989998, 119.779999, 120, 120.080002, 119.970001, 121.879997, 121.940002, 121.949997, 121.629997, 121.349998, 128.75, 128.529999, 129.080002, 130.289993, 131.529999, 132.039993, 132.419998, 132.119995], 
    
//     decreasing: {line: {color: '#7F7F7F'}}, 
    
//     high: [120.239998, 120.5, 120.089996, 120.449997, 120.809998, 120.099998, 122.099998, 122.440002, 122.349998, 121.629997, 121.389999, 130.490005, 129.389999, 129.190002, 130.5, 132.089996, 132.220001, 132.449997, 132.940002], 
    
//     increasing: {line: {color: '#17BECF'}}, 
    
//     line: {color: 'rgba(31,119,180,1)'}, 
    
//     low: [118.220001, 119.709999, 119.370003, 119.730003, 119.769997, 119.5, 120.279999, 121.599998, 121.599998, 120.660004, 120.620003, 127.010002, 127.779999, 128.160004, 128.899994, 130.449997, 131.220001, 131.119995, 132.050003], 
//     open: [118.339996, 120, 119.400002, 120.449997, 120, 119.550003, 120.419998, 121.669998, 122.139999, 120.93, 121.150002, 127.029999, 127.980003, 128.309998, 129.130005, 130.539993, 131.350006, 131.649994, 132.460007], 
    
//     type: 'ohlc', 
//     xaxis: 'x', 
//     yaxis: 'y'
//   };