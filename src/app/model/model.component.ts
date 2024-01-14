import { Component, Output, EventEmitter } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MultitraceComponent } from '../multitrace/multitrace.component';


@Component({
  selector: 'model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
  standalone:true,
  imports:[MatCheckboxModule]
})
export class ModelComponent {
  @Output() NewDataSet = new EventEmitter<string>()

  _probabilitymodelchked:boolean;

  constructor(){
    this._probabilitymodelchked = false;
  }
  
}

@Component({
  selector: 'modelinput',
  templateUrl: './modelinput.html',
  styleUrls: ['./model.component.css'],
  standalone:true,
  imports:[MatCheckboxModule, MultitraceComponent]
})
export class Modelinputdialog {
  @Output() NewDataSet = new EventEmitter<string>()

  

  constructor(){
    
  }
  
}
