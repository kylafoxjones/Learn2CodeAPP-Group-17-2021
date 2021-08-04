import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select/';
import { RouteConfigLoadStart, Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card'

@Component({
  selector: 'app-accept-reject-application',
  templateUrl: './accept-reject-application.component.html',
  styleUrls: ['./accept-reject-application.component.scss'],
})
export class AcceptRejectApplicationComponent implements OnInit {
  tutorApplicationToview=this.service.application;
  x:any;
  // tutorApplicationToview={
  //   tutorName: this.service.application.TutorName,
  // }

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AcceptRejectApplicationComponent>,
    private service: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  
  acceptTutorApplication() {
    //naviagte to create
  }

  rejectTutorApplication(id: number ) {
      Swal.fire({
        title: 'Are you sure you want to reject the applicant?',
        text: '',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          // this.service.deleteTutor(this.tutorApplicationToview).subscribe((result) => {
          //  this.x = result;
          // });
          Swal.fire('Successful rejection', '', 'success');
        }
      });
    }
}
