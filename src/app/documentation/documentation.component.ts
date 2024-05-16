import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';


@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.css'
})
export class DocumentationComponent implements AfterViewInit{
  ScrollTo:ElementRef = {} as ElementRef;
  @Input('element') ScrollToElement = '';
  
  ngAfterViewInit(): void {
    let e = document.getElementById(this.ScrollToElement);
    e?.scrollIntoView(true);
  }
    
}



