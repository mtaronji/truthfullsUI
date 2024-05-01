
import {Component,Output, EventEmitter, } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {

  
  @Output() documentationClick = new EventEmitter<string>();
  constructor(){

  }

  SequenceClick() {
    this.documentationClick.emit("docSequence");
  }
}
