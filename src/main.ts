import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


bootstrapApplication(AppComponent,
  {
    providers:[provideAnimations(), importProvidersFrom(HttpClientModule)]
  }
);

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
