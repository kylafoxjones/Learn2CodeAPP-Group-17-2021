import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
})
export class UniversityComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  edit() {
    this.router.navigateByUrl('/addEditUni');
  }

  
}
