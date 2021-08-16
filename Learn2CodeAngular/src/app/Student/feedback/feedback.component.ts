import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { StudentService } from '../Student resources/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: StudentService
  ) {}

  ngOnInit(): void {}
  delete() {
    Swal.fire({
      title: 'Are you sure you want to delete the feedback',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Unable to Delete Feedback', '', 'error');
      }
    });
  }

  search() {
    Swal.fire({
      icon: 'warning',
      title: 'No matches Found',
      confirmButtonText: 'Ok',
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateFeedbackComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      Swal.fire({
        icon: 'error',
        title: 'Feedback already exists for this session',
        confirmButtonText: 'Okay',
      });
    });
  }
}
