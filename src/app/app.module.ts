import {NgModule } from '@angular/core';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { OhlcPipe } from './Pipes/ohlc.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';






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

