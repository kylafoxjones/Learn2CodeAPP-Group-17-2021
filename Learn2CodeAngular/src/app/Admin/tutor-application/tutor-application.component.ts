import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';
import { AcceptRejectApplicationComponent } from './accept-reject-application/accept-reject-application.component';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-tutor-application',
  templateUrl: './tutor-application.component.html',
  styleUrls: ['./tutor-application.component.scss'],
})
export class TutorApplicationComponent implements OnInit {

   //pagination
   totalLength:any;
   page:number = 1;

 // applicationList: any = [];
  applications; any =[];
  application: any;
  search;

  constructor(
    public dialog: MatDialog,
    private service: AdminService,
    private router: Router,
    
  ) {}

  ngOnInit() {
    this.getAllTutorApplications();
  }

  navigateToApplication(obj) {
   // this.service.getTutorApplicationToLoad(id).subscribe((result) => {
      this.service.application = obj;
      console.log('the applicant chosen',  this.service.application);
      const dialogRef = this.dialog.open(AcceptRejectApplicationComponent, {
        width: '350px',
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.getAllTutorApplications();
        //window.location.reload();
      });
      this.getAllTutorApplications();
    // });
   // this.getAllTutorApplications();
   // window.location.reload();
  }
 


  download(obj) {
    console.log(obj);
    console.log(obj.fileId);
    this.service.downloadCv(obj.fileId).subscribe((blob) => {
      console.log('this is blob: ', blob);
      saveAs(blob, "CV.pdf");
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  getAllTutorApplications() {
    this.service.getTutorApplications().subscribe((result) => {
      this.service.applicationList = result;
      this.applications = this.service.applicationList;

      //pagination 
      this.totalLength = this.applications.length;

      console.log('all applications from api', this.applications);
    });
  }
}
