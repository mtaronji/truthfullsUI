import { Component } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OptionInfoComponent } from './option-info/option-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports:[
    DashboardComponent,
    OptionInfoComponent,


  ]
})
export class AppComponent {
  title = 'Truthfulls';

}
