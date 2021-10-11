import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  searchTerm:any="";
  constructor(private _vps: ViewportScroller) { }

  ngOnInit(): void {
    
  }
  scrollFn(): void{
  	this._vps.scrollToAnchor(this.searchTerm)
}
}
