import { OHLCTrace } from 'src/assets/plotlymodels';
import { OhlcPipe } from './ohlc.pipe';
import { OptionPriceData } from 'src/assets/optionmodels';

describe('OhlcPipe', () => {
  it('create an instance', () => {
    const pipe = new OhlcPipe();
    expect(pipe).toBeTruthy();
  });

  it('should work for stocks', ()=> {
    const pipe = new OhlcPipe();
    const pricedata = {"AAPL":[{"date":"2016-01-04","open":25.6525,"close":26.3375,"adjclose":24.009066,"high":26.342501,"low":25.5,"volume":270597600},{"date":"2016-01-05","open":26.4375,"close":25.6775,"adjclose":23.407408,"high":26.4625,"low":25.602501,"volume":223164000},{"date":"2016-01-06","open":25.139999,"close":25.174999,"adjclose":22.949335,"high":25.592501,"low":24.967501,"volume":273829600},{"date":"2016-01-07","open":24.67,"close":24.112499,"adjclose":21.980776,"high":25.032499,"low":24.1075,"volume":324377600},{"date":"2016-01-08","open":24.637501,"close":24.24,"adjclose":22.096998,"high":24.7775,"low":24.190001,"volume":283192000},{"date":"2016-01-11","open":24.7425,"close":24.6325,"adjclose":22.454798,"high":24.764999,"low":24.334999,"volume":198957600},{"date":"2016-01-12","open":25.137501,"close":24.99,"adjclose":22.780693,"high":25.172501,"low":24.709999,"volume":196616800},{"date":"2016-01-13","open":25.08,"close":24.3475,"adjclose":22.194996,"high":25.297501,"low":24.325001,"volume":249758400},{"date":"2016-01-14","open":24.49,"close":24.879999,"adjclose":22.680412,"high":25.120001,"low":23.934999,"volume":252680400},{"date":"2016-01-15","open":24.049999,"close":24.282499,"adjclose":22.135742,"high":24.4275,"low":23.84,"volume":319335600},{"date":"2016-01-19","open":24.602501,"close":24.165001,"adjclose":22.028633,"high":24.6625,"low":23.875,"volume":212350800},{"date":"2016-01-20","open":23.775,"close":24.1975,"adjclose":22.058262,"high":24.547501,"low":23.355,"volume":289337600},{"date":"2016-01-21","open":24.264999,"close":24.075001,"adjclose":21.946589,"high":24.469999,"low":23.735001,"volume":208646000},{"date":"2016-01-22","open":24.657499,"close":25.355,"adjclose":23.113424,"high":25.365,"low":24.592501,"volume":263202000},{"date":"2016-01-25","open":25.379999,"close":24.860001,"adjclose":22.662186,"high":25.3825,"low":24.8025,"volume":207178000},{"date":"2016-01-26","open":24.9825,"close":24.997499,"adjclose":22.787531,"high":25.219999,"low":24.5175,"volume":300308000},{"date":"2016-01-27","open":24.01,"close":23.355,"adjclose":21.290239,"high":24.157499,"low":23.334999,"volume":533478800},{"date":"2016-01-28","open":23.4475,"close":23.522499,"adjclose":21.442926,"high":23.629999,"low":23.0975,"volume":222715200},{"date":"2016-01-29","open":23.6975,"close":24.334999,"adjclose":22.183601,"high":24.334999,"low":23.5875,"volume":257666000}]};

    const AAPL = pricedata['AAPL'];
    const piped : OHLCTrace[]= pipe.transform(pricedata,"stock");

    const trace:OHLCTrace = piped[0];

    const dates = AAPL.map(x=>x.date);
    const opens = AAPL.map(x=>x.open);
    const closes = AAPL.map(x=>x.adjclose);
    const highs = AAPL.map(x=>x.high);
    const lows = AAPL.map(x=>x.low);

    expect(trace['x']).toEqual(dates);
    expect(trace['open']).toEqual(opens);
    expect(trace['close']).toEqual(closes);
    expect(trace['high']).toEqual(highs);
    expect(trace['low']).toEqual(lows);
  });

  it('should work for options', ()=> {
    const pipe = new OhlcPipe();
    const pricedata:OptionPriceData = {"SPY231117C00320000":[{"duration":1,"maturitydate":"2023-11-17T00:00:00","open":118.8200,"adjclose":119.2000,"high":119.2000,"low":118.8200,"volume":10},{"duration":2,"maturitydate":"2023-11-17T00:00:00","open":122.9900,"adjclose":122.9900,"high":122.9900,"low":122.9900,"volume":1},{"duration":3,"maturitydate":"2023-11-17T00:00:00","open":121.7900,"adjclose":121.4600,"high":121.7900,"low":121.4600,"volume":2},{"duration":4,"maturitydate":"2023-11-17T00:00:00","open":139.6700,"adjclose":139.5700,"high":139.6700,"low":139.5300,"volume":11},{"duration":5,"maturitydate":"2023-11-17T00:00:00","open":132.1500,"adjclose":132.1500,"high":132.1500,"low":132.1500,"volume":9},{"duration":6,"maturitydate":"2023-11-17T00:00:00","open":128.7100,"adjclose":128.7100,"high":128.7100,"low":128.7100,"volume":9},{"duration":7,"maturitydate":"2023-11-17T00:00:00","open":123.6300,"adjclose":123.6100,"high":123.6300,"low":123.6100,"volume":2},{"duration":8,"maturitydate":"2023-11-17T00:00:00","open":115.6300,"adjclose":115.6300,"high":115.6300,"low":115.6300,"volume":1},{"duration":9,"maturitydate":"2023-11-17T00:00:00","open":117.3200,"adjclose":117.4100,"high":117.4100,"low":117.3200,"volume":2},{"duration":10,"maturitydate":"2023-11-17T00:00:00","open":107.3900,"adjclose":103.7200,"high":107.3900,"low":103.7200,"volume":79},{"duration":11,"maturitydate":"2023-11-17T00:00:00","open":104.1500,"adjclose":104.1500,"high":104.1500,"low":104.1500,"volume":1},{"duration":12,"maturitydate":"2023-11-17T00:00:00","open":95.8900,"adjclose":95.8900,"high":95.8900,"low":95.8900,"volume":1},{"duration":13,"maturitydate":"2023-11-17T00:00:00","open":95.8000,"adjclose":94.0400,"high":95.8000,"low":94.0400,"volume":2},{"duration":14,"maturitydate":"2023-11-17T00:00:00","open":95.3500,"adjclose":95.3500,"high":95.3500,"low":95.3500,"volume":1},{"duration":15,"maturitydate":"2023-11-17T00:00:00","open":107.7900,"adjclose":107.7900,"high":107.7900,"low":107.7900,"volume":1},{"duration":16,"maturitydate":"2023-11-17T00:00:00","open":115.3600,"adjclose":115.3600,"high":115.3600,"low":115.3600,"volume":1},{"duration":17,"maturitydate":"2023-11-17T00:00:00","open":116.2100,"adjclose":116.2100,"high":116.2100,"low":116.2100,"volume":1},{"duration":18,"maturitydate":"2023-11-17T00:00:00","open":117.9300,"adjclose":117.9300,"high":117.9300,"low":117.9300,"volume":1},{"duration":19,"maturitydate":"2023-11-17T00:00:00","open":119.6100,"adjclose":119.6100,"high":119.6100,"low":119.6100,"volume":3},{"duration":20,"maturitydate":"2023-11-17T00:00:00","open":131.0000,"adjclose":131.0900,"high":131.3100,"low":131.0000,"volume":63}]}
    const piped : OHLCTrace[]= pipe.transform(pricedata,"option");
    const SPY = pricedata["SPY231117C00320000"];
    const trace:OHLCTrace = piped[0];

    const durations = SPY.map(x=>x.duration);
    const opens = SPY.map(x=>x.open);
    const closes = SPY.map(x=>x.adjclose);
    const highs = SPY.map(x=>x.high);
    const lows = SPY.map(x=>x.low);

    expect(trace['x']).toEqual(durations);
    expect(trace['open']).toEqual(opens);
    expect(trace['close']).toEqual(closes);
    expect(trace['high']).toEqual(highs);
    expect(trace['low']).toEqual(lows);
  });

});
