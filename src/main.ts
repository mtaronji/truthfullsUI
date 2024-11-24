import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { PrivacyComponent } from './app/privacy/privacy.component';
import { TermsofserviceComponent } from './app/termsofservice/termsofservice.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom, inject } from '@angular/core';
import {} from '@angular/common/http';
import {RouterModule, Routes, provideRouter, withComponentInputBinding} from '@angular/router';
import { PlotComponent } from './app/plot/plot.component';

import { DocumentationComponent } from './app/documentation/documentation.component';
import { FeedbackComponent } from './app/feedback/feedback.component';
import { LandingComponent } from './app/landing/landing.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { EventemitService } from './app/Services/eventemit.service';


const IDE:Routes = [
  {path:'termsofservice', component:TermsofserviceComponent},
  {path:'privacy', component:PrivacyComponent},
  {path:'documentation/:element', component:DocumentationComponent},
  {path:'feedback', component:FeedbackComponent},
  {path:'punk', component:PlotComponent}
]

// const appRoutes: Routes =   [
//   {path:'', 
//     component:LandingComponent,
//     children:[
//       {path:'privacy', component:PrivacyComponent},
//       {path:'termsofservice', component:TermsofserviceComponent}
//     ]
//   },
//   {path:'', 
//     component:DashboardComponent,
//     canActivate:[
//       () =>{
//        return inject(EventemitService)._isAuthenticated;       
//       }
//     ],
//     children:[  
//       {path:'ide', component:PlotComponent},
//       {path:'documentation/:element', component:DocumentationComponent},
//       {path:'feedback', component:FeedbackComponent},
     
//   ]},

// ];

const appRoutes: Routes =   [
  // {path:'', 
  //   component:LandingComponent,
  //   children:[
  //     {path:'privacy', component:PrivacyComponent},
  //     {path:'termsofservice', component:TermsofserviceComponent}
  //   ]
  // },
  {path:'', 
    component:DashboardComponent,
    children:[  
      {path:'', component:PlotComponent},
      {path:'documentation/:element', component:DocumentationComponent},
      {path:'feedback', component:FeedbackComponent},
     
  ]},

];
bootstrapApplication(AppComponent,
  {
    providers:[provideAnimations(), importProvidersFrom(HttpClientModule),
      importProvidersFrom(
        RouterModule.forRoot(appRoutes,{bindToComponentInputs:true})
      ),
      provideRouter(appRoutes, withComponentInputBinding())
      ]
  }
);

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
