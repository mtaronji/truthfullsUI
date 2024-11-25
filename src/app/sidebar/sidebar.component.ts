
import {Component,Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'sidebar',
    imports: [MatButtonModule, MatIconModule, RouterLink, CdkAccordionModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements AfterViewInit {

  SideBarExpanded:boolean = false;
  
  constructor(){
    let w = window.innerWidth;
    if (w > 1200){
      this.SideBarExpanded = true;
    }
  }
  ngAfterViewInit(): void {
   
  }

  SequenceClick() {
    
  }
}


