import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';
import { AcceptRejectApplicationComponent } from './accept-reject-application/accept-reject-application.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tutor-application',
  templateUrl: './tutor-application.component.html',
  styleUrls: ['./tutor-application.component.scss'],
})
export class TutorApplicationComponent implements OnInit {
 // applicationList: any = [];
  applications; any =[];
  application: any;
  search;

  constructor(
    public dialog: MatDialog,
    private service: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTutorApplications();
  }

  navigateToApplication(id: number) {
    this.service.getTutorApplicationToLoad(id).subscribe((result) => {
      this.service.application = result;
      console.log('the applicant chosen',  this.service.application);
      const dialogRef = this.dialog.open(AcceptRejectApplicationComponent, {
        width: '350px',
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.getAllTutorApplications();
      });
    });
  }

  getAllTutorApplications() {
    this.service.getTutorApplications().subscribe((result) => {
      this.service.applicationList = result;
      this.applications = this.service.applicationList;
      console.log('all applications from api', this.applications);
    });
  }
}
