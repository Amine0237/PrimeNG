/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
/*
  bootstrapApplication(AppComponent,{
    providers:[importProvidersFrom([BrowserAnimationsModule])]
  }); 
*/