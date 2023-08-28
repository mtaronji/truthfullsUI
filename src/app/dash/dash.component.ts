import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { StockinfoComponent } from '../stockinfo/stockinfo.component';
import { MultitraceComponent } from '../multitrace/multitrace.component';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
  standalone:true,
  
  imports :[
    MatTabsModule,
    StockinfoComponent,
    MultitraceComponent
  ]
})
export class DashComponent {
  
}
