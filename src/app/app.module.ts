import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material.module';

import {HttpClientModule} from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesComponent } from './movies/movies.component';
@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    DashboardComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    MyMaterialModule,
    HttpClientModule,
    MatCarouselModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [LoadingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
