import { TestBed } from '@angular/core/testing';
import { APIService } from './api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { of,Observable } from 'rxjs';

describe('APIService', () => {
  let service: APIService;
  let mockedAPIService: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule]
    });
    mockedAPIService = jasmine.createSpyObj('APIService',['getTickers']);
    service = TestBed.inject(APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  // it('get tickers should work', async() =>{
    
  //   let testdata:string[] = ["A","AA","AAL","AAP","AAPL","ABBV","ABC","ABNB","ABT","ACGL","ACI","ACN","ADBE","ADI","ADM","ADP","ADSK","AEE","AEP","AES","AIG","AIZ","AJG","AKAM","ALB","ALGN","ALK","ALL","ALLE","ALNY","AMAT","AMCR","AMD","AME","AMGN","AMP","AMR","AMRC","AMT","AMZN","ANET","ANSS","AON","AOS","APA","APD","APH","APTV","ARCH","ARE","ARGX","ARKK","ARNC","ASB","ASML","ASO","ATI","ATO","ATVI","AVB","AVGO","AVY","AWK","AXP","AZN","AZO","BA","BAC","BALL","BAX","BBWI","BBY","BDX","BEAM","BF-B","BG","BGNE","BIIB","BIO","BJ","BK","BKNG","BKR","BLD","BLDR","BLK","BMRN","BMY","BNTX","BPOP","BR","BRK-B","BRKR","BRO","BSX","BTC-USD","BTU","BWA","BXP","C","CADE","CAG","CAH","CALX","CARR","CASY","CAT","CB","CBOE","CBRE","CCD","CCI","CCL","CCOI","CDAY","CDE","CDNS","CDW","CE","CRM","DVN","DX-Y.NYB","EURUSD=X","GOOG","HD","IBB","IBM","ITB","IYR","JPM","JPY=X","KBH","KRE","LEN","META","MS","MSFT","MU","NFLX","NVDA","OXY","QCOM","QQQ","RSP","RUN","S\u0026P500","SMH","SPY","TAN","TLT","TMO","TSLA","TSM","TXN","UNH","V","XHB","XLE","XLF","XLI","XLK","XLP","XLU","XLV","XLY","XME","XOP","XRT","XTL","^FVX","^IRX","^IXIC","^RUT","^TNX","^VIX"];
  //   mockedAPIService.getTickers.and.returnValue(of(testdata));
  // });
});
