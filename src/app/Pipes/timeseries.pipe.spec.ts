import { FredData } from 'src/assets/stockmodels';
import { TimeSeriesPipe } from './timeseries.pipe';
import { Trace } from 'src/assets/plotlymodels';

describe('Time Series Pipe', () => {
  it('create an instance', () => {
    const pipe = new TimeSeriesPipe();
    expect(pipe).toBeTruthy();
  });

  it('should map trace[x] to dates and trace[y] to closes for stocks', () => {
    const pipe = new TimeSeriesPipe();
    const pricedata = {"AAPL":[{"date":"2016-01-04","open":25.6525,"close":26.3375,"adjclose":24.009066,"high":26.342501,"low":25.5,"volume":270597600},{"date":"2016-01-05","open":26.4375,"close":25.6775,"adjclose":23.407408,"high":26.4625,"low":25.602501,"volume":223164000},{"date":"2016-01-06","open":25.139999,"close":25.174999,"adjclose":22.949335,"high":25.592501,"low":24.967501,"volume":273829600},{"date":"2016-01-07","open":24.67,"close":24.112499,"adjclose":21.980776,"high":25.032499,"low":24.1075,"volume":324377600},{"date":"2016-01-08","open":24.637501,"close":24.24,"adjclose":22.096998,"high":24.7775,"low":24.190001,"volume":283192000},{"date":"2016-01-11","open":24.7425,"close":24.6325,"adjclose":22.454798,"high":24.764999,"low":24.334999,"volume":198957600},{"date":"2016-01-12","open":25.137501,"close":24.99,"adjclose":22.780693,"high":25.172501,"low":24.709999,"volume":196616800},{"date":"2016-01-13","open":25.08,"close":24.3475,"adjclose":22.194996,"high":25.297501,"low":24.325001,"volume":249758400},{"date":"2016-01-14","open":24.49,"close":24.879999,"adjclose":22.680412,"high":25.120001,"low":23.934999,"volume":252680400},{"date":"2016-01-15","open":24.049999,"close":24.282499,"adjclose":22.135742,"high":24.4275,"low":23.84,"volume":319335600},{"date":"2016-01-19","open":24.602501,"close":24.165001,"adjclose":22.028633,"high":24.6625,"low":23.875,"volume":212350800},{"date":"2016-01-20","open":23.775,"close":24.1975,"adjclose":22.058262,"high":24.547501,"low":23.355,"volume":289337600},{"date":"2016-01-21","open":24.264999,"close":24.075001,"adjclose":21.946589,"high":24.469999,"low":23.735001,"volume":208646000},{"date":"2016-01-22","open":24.657499,"close":25.355,"adjclose":23.113424,"high":25.365,"low":24.592501,"volume":263202000},{"date":"2016-01-25","open":25.379999,"close":24.860001,"adjclose":22.662186,"high":25.3825,"low":24.8025,"volume":207178000},{"date":"2016-01-26","open":24.9825,"close":24.997499,"adjclose":22.787531,"high":25.219999,"low":24.5175,"volume":300308000},{"date":"2016-01-27","open":24.01,"close":23.355,"adjclose":21.290239,"high":24.157499,"low":23.334999,"volume":533478800},{"date":"2016-01-28","open":23.4475,"close":23.522499,"adjclose":21.442926,"high":23.629999,"low":23.0975,"volume":222715200},{"date":"2016-01-29","open":23.6975,"close":24.334999,"adjclose":22.183601,"high":24.334999,"low":23.5875,"volume":257666000}]};

    const piped : Trace[]= pipe.transform(pricedata,"stock");

    const alldates:any= pricedata['AAPL'].map((d) => (d.date));
    const close:any = pricedata['AAPL'].map( (d) => (d.adjclose) );

    const trace = piped[0];
    
    expect(trace['x']).toEqual(alldates);
    expect(trace['y']).toEqual(close);
    expect(trace.name).toEqual("AAPL");
  
  });

  it('should map trace[x] to dates and trace[y] to closes for options', () => {
    const pipe = new TimeSeriesPipe();
    const pricedata = {"SPY231117C00320000":[{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-10-18","open":118.82,"adjclose":119.2,"high":119.2,"low":118.82,"volume":10,"vwap":119.029,"duration":1},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-10-19","open":122.99,"adjclose":122.99,"high":122.99,"low":122.99,"volume":1,"vwap":122.99,"duration":2},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-10-20","open":121.79,"adjclose":121.46,"high":121.79,"low":121.46,"volume":2,"vwap":121.625,"duration":3},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-10-23","open":139.67,"adjclose":139.57,"high":139.67,"low":139.53,"volume":11,"vwap":139.5809,"duration":4},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-10-24","open":132.15,"adjclose":132.15,"high":132.15,"low":132.15,"volume":9,"vwap":132.15,"duration":5},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-10-25","open":128.71,"adjclose":128.71,"high":128.71,"low":128.71,"volume":9,"vwap":128.71,"duration":6},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-10-26","open":123.63,"adjclose":123.61,"high":123.63,"low":123.61,"volume":2,"vwap":123.62,"duration":7},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-10-27","open":115.63,"adjclose":115.63,"high":115.63,"low":115.63,"volume":1,"vwap":115.63,"duration":8},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-10-30","open":117.32,"adjclose":117.41,"high":117.41,"low":117.32,"volume":2,"vwap":117.365,"duration":9},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-10-31","open":107.39,"adjclose":103.72,"high":107.39,"low":103.72,"volume":79,"vwap":104.211,"duration":10},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-11-01","open":104.15,"adjclose":104.15,"high":104.15,"low":104.15,"volume":1,"vwap":104.15,"duration":11},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-11-02","open":95.89,"adjclose":95.89,"high":95.89,"low":95.89,"volume":1,"vwap":95.89,"duration":12},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-11-03","open":95.8,"adjclose":94.04,"high":95.8,"low":94.04,"volume":2,"vwap":94.92,"duration":13},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-11-06","open":95.35,"adjclose":95.35,"high":95.35,"low":95.35,"volume":1,"vwap":95.35,"duration":14},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-11-07","open":107.79,"adjclose":107.79,"high":107.79,"low":107.79,"volume":1,"vwap":107.79,"duration":15},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-11-08","open":115.36,"adjclose":115.36,"high":115.36,"low":115.36,"volume":1,"vwap":115.36,"duration":16},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-11-09","open":116.21,"adjclose":116.21,"high":116.21,"low":116.21,"volume":1,"vwap":116.21,"duration":17},{"optioncode":"SPY231117C00320000","maturitydate":"2023-11-17","date":"2023-11-10","open":117.93,"adjclose":117.93,"high":117.93,"low":117.93,"volume":1,"vwap":117.93,"duration":18}]};

    const piped : Trace[]= pipe.transform(pricedata,"stock");

    const alldates:any= pricedata['SPY231117C00320000'].map((d) => (d.date));
    const close:any = pricedata['SPY231117C00320000'].map( (d) => (d.adjclose) );

    const trace = piped[0];
    
    expect(trace['x']).toEqual(alldates);
    expect(trace['y']).toEqual(close);
    expect(trace.name).toEqual("SPY231117C00320000");
  
  });

  it('should map trace[x] to dates and trace[y] to closes for FRED Data', () => {
    const pipe = new TimeSeriesPipe();
    const data:FredData = {series:{seriesID:"T10Y2Y",title:"test_title",units:"test_unit"}, observations:[{"seriesID":"T10Y2Y","date":"1976-06-01","observation":0.68},{"seriesID":"T10Y2Y","date":"1976-06-02","observation":0.71},{"seriesID":"T10Y2Y","date":"1976-06-03","observation":0.7},{"seriesID":"T10Y2Y","date":"1976-06-04","observation":0.77},{"seriesID":"T10Y2Y","date":"1976-06-07","observation":0.79},{"seriesID":"T10Y2Y","date":"1976-06-08","observation":0.79},{"seriesID":"T10Y2Y","date":"1976-06-09","observation":0.82},{"seriesID":"T10Y2Y","date":"1976-06-10","observation":0.86},{"seriesID":"T10Y2Y","date":"1976-06-11","observation":0.83},{"seriesID":"T10Y2Y","date":"1976-06-14","observation":0.83},{"seriesID":"T10Y2Y","date":"1976-06-15","observation":0.83},{"seriesID":"T10Y2Y","date":"1976-06-16","observation":0.81},{"seriesID":"T10Y2Y","date":"1976-06-17","observation":0.79},{"seriesID":"T10Y2Y","date":"1976-06-18","observation":0.82},{"seriesID":"T10Y2Y","date":"1976-06-21","observation":0.85},{"seriesID":"T10Y2Y","date":"1976-06-22","observation":0.8},{"seriesID":"T10Y2Y","date":"1976-06-23","observation":0.8},{"seriesID":"T10Y2Y","date":"1976-06-24","observation":0.82},{"seriesID":"T10Y2Y","date":"1976-06-25","observation":0.81},{"seriesID":"T10Y2Y","date":"1976-06-28","observation":0.84},{"seriesID":"T10Y2Y","date":"1976-06-29","observation":0.84},{"seriesID":"T10Y2Y","date":"1976-06-30","observation":0.84},{"seriesID":"T10Y2Y","date":"1976-07-01","observation":0.86},{"seriesID":"T10Y2Y","date":"1976-07-02","observation":0.85},{"seriesID":"T10Y2Y","date":"1976-07-06","observation":0.86},{"seriesID":"T10Y2Y","date":"1976-07-07","observation":0.85},{"seriesID":"T10Y2Y","date":"1976-07-08","observation":0.9},{"seriesID":"T10Y2Y","date":"1976-07-09","observation":1.01},{"seriesID":"T10Y2Y","date":"1976-07-12","observation":1.04}]};
    const piped : Trace[]= pipe.transform(data,"fred");

    let alldates:string[]= data.observations.map((d) => (d.date));
    let close:number[] = data.observations.map( (d) => (d.observation));

    const trace = piped[0];
    
    expect(trace.x).toEqual(alldates);
    expect(trace.y).toEqual(close);
    expect(trace.name).toEqual(data.series.title);
  
  });
});
