import {Component, Output, isDevMode, EventEmitter,AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { APIService } from '../Services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { User } from 'src/assets/authmodels';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { EventemitService } from '../Services/eventemit.service';

import { Router } from '@angular/router';



@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule, CommonModule, MatTooltipModule, MatSnackBarModule],
    providers: []
})
export class LoginComponent implements AfterViewInit {
  username:string;
  email:string;
  roles:string;
  authenticated:boolean;
  
  ngAfterViewInit(): void {
    this._sharedevents.showLoginScreen$.subscribe(
      (authenticated:boolean) =>{
        if(!authenticated){
          this.openlogindialog();
        }
        
      }
    );
    this.api.GetAuthenicationDetails().subscribe(
      (response:User)=>{

        if(response == null){
          if(this.authenticated){
            this.authenticated = false;
            this._sharedevents._isAuthenticated.next(false);
          }
        }else{
          if(!this.authenticated){
            this.username = response.username;
            this.email = response.email;
            this.roles = response.roles ? response.roles.toString() : "";
            this.authenticated = true;
            this._sharedevents._isAuthenticated.next(true);
          }
    
        } 
      }
    );
  }

  
  constructor(public logindialog:MatDialog, public logoutdialog:MatDialog, private api:APIService, private snackbar:MatSnackBar, private _sharedevents:EventemitService, private _router:Router){
    this.authenticated = false;
    this.roles = "";
    this.email = ""
    this.username = ""; 
    
  }

  openlogindialog(): void {

    let dialogRef = this.logindialog.open(logindialog, {height:'700px', width:'350px', panelClass:"login-dialog"});
    dialogRef.afterClosed().subscribe(
      (login:boolean)=>{
        
        if(login){
          this.externalsignout();
        }
        else{
          return;
        }
      }
      
    );

  }

  openlogoutdialog(): void {

    let dialogRef = this.logoutdialog.open(logoutdialog, {height:'300px', width:'240px', panelClass:"login-dialog"});

    dialogRef.afterClosed().subscribe(
      (logout:boolean)=>{
        
        if(logout){
          this.externalsignout();
        }
        else{
          return;
        }
      }
      
    );
  }
  externalsignout():void{
    this.api.externalsignout().subscribe(
      (response)=>{          
        //success
        this.authenticated = false;
        this._sharedevents._isAuthenticated.next(false);
        this.snackbar.open("You have successfully logged off", undefined, {duration:3000});
        window.location.reload();
  
        
      }
    );
  }
    
}

@Component({
    selector: 'logindialog',
    templateUrl: 'logindialog.html',
    imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule]
})
export class logindialog {
  redirecturl:string;
  authenticationurl:string;
  twitterloginurl:string;
  facebookurl:string;
  googleurl:string;
  provider:string;
  
  constructor(public dialogref: MatDialogRef<logindialog>) {
    this.provider ="";
    if(isDevMode()){
      this.redirecturl = encodeURIComponent("http://localhost:4200/home/ide"); //encode it to pass it as a parameter
      //this.redirecturl = encodeURIComponent("http://localhost:50814/home/punk"); //encode it to pass it as a parameter
      this.authenticationurl = "https://localhost:50814/account/externallogin";
    }
    else{
      this.redirecturl = "/home/ide";
      this.authenticationurl = "/account/externallogin";
    }

    this.twitterloginurl = `${this.authenticationurl}/Twitter/${this.redirecturl}`;
    this.googleurl = `${this.authenticationurl}/Google/${this.redirecturl}`;
    this.facebookurl = `${this.authenticationurl}/Facebook/${this.redirecturl}`;
  }

  onNoClick(): void {

  }
}


@Component({
    selector: 'logoutdialog',
    templateUrl: 'logoutdialog.html',
    imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule]
})
export class logoutdialog {

  constructor(public dialogref: MatDialogRef<logoutdialog>) {

  }

  onYesClick() :void{
    let logout:boolean = true;
    this.dialogref.close(logout);
  }
  onNoClick(): void {
    let logout:boolean = false;
    this.dialogref.close(logout);
  }

}
