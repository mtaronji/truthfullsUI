//typical daily stock data 
export interface StockPrice{

    date:string;
    open:number;
    close:number;
    adjclose:number;
    high:number;
    low:number;
    volume:number;
}

export interface CloseModel{
    date:string;
    close:number;
}

export interface CloseTraces{
    closes:CloseModel[];
}

export interface StockPriceData{
    [ticker:string]:StockPrice[]; 
}
//exponential moving average data
export interface EMAData{
    value:number;
}

//simple moving average data
export interface SMAData{
    value:number;
}

export enum TimeType{
    Daily = 1,
    Weekly = 2,
    Monthly = 3,
    Quarterly = 4
}

export interface series{
    seriesID:string;
    title:string;
    units:string;
}

export interface Observations{
    date:string;
    seriesID:string;
    observation:number;
}

export interface FredData{
    observations:Observations[];
    series:series;
}