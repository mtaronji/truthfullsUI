
import {Component,Output, EventEmitter, ViewChild, ElementRef, } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink,CdkAccordionModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {


  
  constructor(){

  }

  SequenceClick() {
    
  }
}


