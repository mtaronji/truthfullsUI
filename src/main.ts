import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { PrivacyComponent } from './app/privacy/privacy.component';
import { TermsofserviceComponent } from './app/termsofservice/termsofservice.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { LandingComponent } from './app/landing/landing.component';

bootstrapApplication(AppComponent,
  {
    providers:[provideAnimations(), importProvidersFrom(HttpClientModule), 
      importProvidersFrom(RouterModule.forRoot(
        [
          {path:'privacy', component:PrivacyComponent},
          {path:'termsofservice', component:TermsofserviceComponent},
          {path:'', component:DashboardComponent}
          // {path:'', component:LandingComponent}
        ]))
      ]
  }
);

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
