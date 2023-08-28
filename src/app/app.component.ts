import { Component } from '@angular/core';
import { DashComponent } from './dash/dash.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports:[
    DashComponent
  ]
})
export class AppComponent {
  title = 'TruthfullsUI';

}
