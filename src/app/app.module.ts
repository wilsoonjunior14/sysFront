import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material.module';

import {HttpClientModule} from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    MyMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [LoadingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
