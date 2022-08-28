/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RegisterSubclassesService } from '@gs/shared/parse/subclass-util';
import { HttpClientModule } from '@angular/common/http';

import * as Parse from 'parse';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(subclassService: RegisterSubclassesService) {
    Parse.initialize('guardswift');

    //if (!environment.production) {
    //  (Parse as any).serverURL = 'https://gsdev-server.herokuapp.com/parse';
    //} else {
      (Parse as any).serverURL = 'https://guardswift-server.herokuapp.com/parse';
    //}

    subclassService.register();
  }
}
