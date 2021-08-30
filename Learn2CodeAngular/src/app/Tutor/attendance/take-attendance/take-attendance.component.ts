import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TutorService } from '../../tutor resources/tutor.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.scss'],
})
export class TakeAttendanceComponent implements OnInit {
  students: any = [];
  data: any;
  //pagination
  page1:number = 1;
  totalLength1:any;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<TakeAttendanceComponent>,
    private service: TutorService
  ) {}

  ngOnInit() {
    this.getStudentListForAttendance();
  }

  getStudentListForAttendance() {
    console.log('id of booking instancce', this.service.sessionInstance.id);
    this.service
      .getSessionList(this.service.sessionInstance.id)
      .subscribe((res) => {
        this.students = res;
        console.log('students in session', this.students);
      });
  }

  confirmed() {
    Swal.fire({
      title: 'Are you sure you want to take the attendance?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
        console.log('updated list', this.students);
        this.service.submitAttendance(this.students).subscribe(
          (result) => {
            this.data = result;
            Swal.fire('Attendance saved!', this.data.message, 'success');
          },
          (error) => {
            Swal.fire('Error!', error.error, 'error');
          }
        );
      }
    });
  }
}
