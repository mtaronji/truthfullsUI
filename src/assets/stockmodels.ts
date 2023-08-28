//typical daily stock data 
export interface PriceModel{

    date:string;
    open:number;
    close:number;
    adjclose?:number;
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

export interface PriceData{
    [ticker:string]:PriceModel[]; 
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

