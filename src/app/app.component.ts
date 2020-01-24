import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { map, windowCount } from "rxjs/operators";

import MoviesService from "./services/movies.service";
import {LoadingComponent} from "./loading/loading.component";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title: string =  'sysFront';
  movies     = [];
  genres     = [];
  visible: Boolean = true;
  breakpoint = 6;
  rowHeight  = "2:3";
  page:number= 1;
  scrollY    = 0;
  search     = {idOption: "0"};

  constructor(private http: HttpClient, private moviesService: MoviesService, private loading: LoadingComponent){
  }

  ngOnInit(){
    this.onInitDisplay();
    this.onResizeDisplay();
    this.onScrollList();
    this.getGenres();
    this.getMoviesGenerals(this.page, true);
    this.getMoviesGenerals(this.page+1, true);
    this.page += 1;
  }

  onResizeDisplay(){
    window.addEventListener("resize", (evt) => {
      this.changeBreakpoint();
    });
  }

  changeBreakpoint(){
    if (window.innerWidth <= 450){
      this.breakpoint = 1;
      this.rowHeight  = "2:2.5";
      return;
    }

    if (window.innerWidth >= 450 && window.innerWidth <= 800){
      this.breakpoint = 2;
      this.rowHeight  = "2:3";
      return;
    }

    if (window.innerWidth >= 800 && window.innerWidth <= 1200){
      this.breakpoint = 3;
      this.rowHeight  = "2:3";
      return;
    }

    if (window.innerWidth >= 1200){
      this.breakpoint = 5;
      this.rowHeight  = "2:3";
      return;
    }

    this.breakpoint = 6;
  }

  onInitDisplay(){
    this.changeBreakpoint();
  }

  onScrollList(){
    window.addEventListener("scroll", (evt) => {
      let newScrollY = window.scrollY;
      if (newScrollY > this.scrollY && newScrollY > (400*this.page)){
        this.page += 1;
        this.scrollY = newScrollY;
        if (this.search.idOption == "0"){
          this.getMoviesGenerals(this.page, false);
          this.getMoviesGenerals(this.page+1, false);
          this.page++;
        }
        if (this.search.idOption != "0"){
          this.getMovies(this.page, false);
          this.getMovies(this.page+1, false);
          this.page++;
        }
        
      }
    });
  }

  tapOnMovie(movie){
    console.log(movie);
  }

  async changeOptionMovies(evt){
    this.page = 1;
    this.movies = [];
    this.search.idOption = evt.value;

    if (evt.value == 0){
      this.getMoviesGenerals(this.page, true);
      this.page++;
      this.getMoviesGenerals(this.page+1, true);
      return;
    }
    
    this.visible = true;
    this.loading.start();

    
    this.getMovies(this.page, true);
    this.getMovies(this.page+1, true);
    this.page++;

    this.loading.end();
    this.visible = false;
  }

  async getGenres(){
    this.visible = true;
    this.loading.start();

    let response = await this.moviesService.getGenres().toPromise();
    this.genres = response["genres"];
    this.loading.end();
    this.visible = false;
  }

  async getMoviesGenerals(page, bool){
    if (bool){
      this.visible = true;
      this.loading.start();
    }
    
    let response = await this.moviesService.getMovies("&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page="+page).toPromise();
    response["results"].forEach((item) => { if(item.poster_path != null) this.movies.push(item)});
    
    if (bool){
      this.loading.end();
      this.visible = false;
    }
  }

  async getMovies(page, bool){
    if (bool){
      this.visible = true;
      this.loading.start();
    }
    
    let response = await this.moviesService.getMovies("&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres="+this.search.idOption+"&page="+page).toPromise();
    response["results"].forEach((item) => { if(item.poster_path != null) this.movies.push(item)});
    
    if (bool){
      this.loading.end();
      this.visible = false;
    }
  }

}
