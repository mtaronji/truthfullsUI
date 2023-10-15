export interface OptionCodes{
    ticker:string,
    codes:string[]
}

export interface OptionCodeData{
    [ticker:string]: string[];
}
export interface OptionPrice{
    optioncode:string;
    maturitydate:string;
    date:string;
    open:number;
    adjclose:number;
    high:number;
    low:number;
    volume:number;
    vwap:number;
    duration:number;
}
export interface OptionPriceData{
    [ticker:string]: OptionPrice[];
}