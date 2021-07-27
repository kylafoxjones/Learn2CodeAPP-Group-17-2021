import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  edit() {
    this.router.navigateByUrl('/addEditDegree');
  }
}
