import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import MoviesService from "../services/movies.service";
import {LoadingComponent} from "../loading/loading.component";
import display from "../utils/display";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  visible: Boolean = false;
  title: string =  'sysFront';
  movie = {};
  breakpoint = 1;
  display: display = new display();

  constructor(private activateRoute: ActivatedRoute, private moviesService: MoviesService, private loading: LoadingComponent) { }

  ngOnInit() {
    let id = this.activateRoute.snapshot.paramMap.get("id");
    this.getMovie(id);
    this.breakpoint = this.display.changeBreakpoint();
    this.onResizeDisplay();
  }

  onResizeDisplay(){
    window.addEventListener("resize", (evt) => {
      this.breakpoint = this.display.changeBreakpoint();
    });
  }

  async getMovie(id){
    this.visible = true;
    this.loading.start();

    let response = await this.moviesService.getMovie(id).toPromise();
    this.movie = response;
    console.log(this.movie);
    this.loading.end();
    this.visible = false;
  }

}
