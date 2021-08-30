import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select/';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CreateTutorComponent } from '../create-tutor/create-tutor.component';

@Component({
  selector: 'app-accept-reject-application',
  templateUrl: './accept-reject-application.component.html',
  styleUrls: ['./accept-reject-application.component.scss'],
})
export class AcceptRejectApplicationComponent implements OnInit {
  tutorApplicationToview: any = {};
  x: any;
  data: any;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AcceptRejectApplicationComponent>,
    private service: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tutorApplicationToview = this.service.application;
  }

  acceptTutorApplication() {
    this.tutorApplicationToview = this.service.application;
    //  this.service.getTutorApplicationToLoad(id).subscribe((result) => {
    //  this.service.tutorToCreate = result;
    console.log('the tutor chosen to accept', this.tutorApplicationToview);
    const dialogRef = this.dialog.open(CreateTutorComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Swal.fire('Successful acceptance', '', 'success');
      this.dialogRef.close();
    }, (error) => {
      this.dialogRef.close();
      Swal.fire('Error!', error.error, 'error');
    });
    this.dialogRef.close();
    // });
  }

  rejectTutorApplication(id: number) {
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
        this.service.getTutorApplicationToLoad(id).subscribe((result) => {
          this.service.tutorToDelete = result;
          console.log('the tutor chosen to reject', this.service.tutorToDelete);
          this.service.rejectApp().subscribe(
            (result) => {
              this.data = result;
              Swal.fire('Rejection complete!', this.data.message, 'success').then((result) => {
                this.dialogRef.close();
                window.location.reload();
              });
              
             
            },
            (error) => {
              Swal.fire('Error!', error.error, 'error');
              this.dialogRef.close();
            }
          );
        });
      }
    });
    
  }
}
