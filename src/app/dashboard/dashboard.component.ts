import { AfterViewInit, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from '../login/login.component';

import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { PlotComponent } from '../plot/plot.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    MatToolbarModule,
    LoginComponent,
    MatSnackBarModule,
    PlotComponent,
    SidebarComponent,
    RouterOutlet,
  ]
})
export class DashboardComponent implements AfterViewInit{


  _authenticated:boolean;
  csvData:any;
  ngAfterViewInit(): void {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let smallscreenAlert:string = "For the best possible experience, we recommend viewing on a larger screen";
    if (w < 1200){
      this.snackbar.open(smallscreenAlert, undefined,{duration:10000});
    }
 
  }

  constructor(private snackbar:MatSnackBar ){
    this._authenticated = false;
  }

  NewCSVData(csvdata:any){
    this.csvData = csvdata;
  }
  public AuthenticationChange(isauthenticated:boolean){

    this._authenticated = isauthenticated;

    if(isauthenticated){
      this.snackbar.open("You are now logged in", undefined,{duration:3000});
    }
    
  }
  
}

