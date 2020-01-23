import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() visible:Boolean;

  constructor() { }

  ngOnInit() {
  }

  start(){
    let element = document.querySelector('body');
    element.style.backgroundColor = "#968d8d";
    element.style.pointerEvents   = "none";
    element.style.opacity         = "70%";
    this.visible                  = true;
  }

  end(){
    let element = document.querySelector('body');
    element.style.backgroundColor = "white";
    element.style.pointerEvents   = "";
    element.style.opacity         = "100%";
    this.visible                  = false;
  }

}
