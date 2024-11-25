import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import {RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        LayoutComponent,
        RouterModule
    ]
})
export class AppComponent {
  title = 'Punker';

}
