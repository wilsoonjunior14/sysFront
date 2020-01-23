import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";

import MoviesService from "./services/movies.service";
import {LoadingComponent} from "./loading/loading.component";

export interface Endereco{
  cep: string;
  localidade: string;
}

export interface Movies{
  popularity: number;
  vote_average: number;
  title: string;
  overview: string;
  poster_path: string;
  original_title: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title: string =  'sysFront';
  movies: Array<Movies> = [];
  visible: Boolean = false;

  constructor(private http: HttpClient, private moviesService: MoviesService, private loading: LoadingComponent){
  }

  ngOnInit(){
    this.getMovies();
  }

  async getMovies(){
    this.visible = true;
    this.loading.start();
    
    let response = await this.moviesService.getMovies("&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1").toPromise();
    this.movies  = response["results"];
    console.log(this.movies);
    
    this.loading.end();
    this.visible = false;
  }

}
