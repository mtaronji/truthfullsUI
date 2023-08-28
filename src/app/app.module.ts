import {NgModule } from '@angular/core';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { OhlcPipe } from './Pipes/ohlc.pipe';






@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports:[]
})
export class AppModule { }

