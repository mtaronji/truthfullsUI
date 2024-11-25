import { Component,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from '../login/login.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EventemitService } from '../Services/eventemit.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    imports: [MatToolbarModule, LoginComponent, RouterOutlet,
        MatIconModule, MatButtonModule, MatTooltipModule, CommonModule, DashboardComponent, FooterComponent, RouterModule
    ]
})
export class LayoutComponent implements AfterViewInit  {
  _authenticated:boolean;

  constructor(private snackbar:MatSnackBar, private _sharedevents:EventemitService){
    this._authenticated = false;
    
  }

  ngAfterViewInit(): void {
    this._sharedevents.AuthenticationChange$.subscribe(
      (authenticated:boolean)=>{
        this.AuthenticationChange(authenticated);
      }
    )
  }
  public AuthenticationChange(isauthenticated:boolean){

    this._authenticated = isauthenticated;

    if(isauthenticated){
      this.snackbar.open("You are now logged in", undefined,{duration:3000});
    }
  }

  showLogin(){
    this._sharedevents._loginScreen.next(false);
  }
    
}
