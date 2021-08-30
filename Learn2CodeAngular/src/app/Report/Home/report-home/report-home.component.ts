import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { NbLayoutModule } from '@nebular/theme';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.scss']
})
export class ReportHomeComponent implements OnInit {
  
  constructor( private route: Router,) { }

  ngOnInit(): void {
  }


  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.route.navigate(['/loginhomepage/login']);
  };
}
