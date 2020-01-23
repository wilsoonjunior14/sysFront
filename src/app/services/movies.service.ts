import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import config from "../utils/config";
import { Observable } from 'rxjs';

export interface Movies{
  popularity: number;
  vote_average: number;
  title: string;
  overview: string;
  poster_path: string;
  original_title: string;
}


@Injectable({
  providedIn: 'root'
})
export default class MoviesService {

  constructor(private http: HttpClient) {
   }

   getMovies(query: string){
     return this.http.get(config.URLApi + config.PathSearchMovies + config.API_KEY + query);
   }

}
