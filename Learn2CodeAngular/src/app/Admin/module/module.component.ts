import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  edit() {
    this.router.navigateByUrl('/addEditModule');
  }

}
