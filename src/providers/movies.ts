import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


export default class moviesProvider implements OnInit{

    

    constructor(private http:HttpClient) {
    }

    ngOnInit() {
    }
}

