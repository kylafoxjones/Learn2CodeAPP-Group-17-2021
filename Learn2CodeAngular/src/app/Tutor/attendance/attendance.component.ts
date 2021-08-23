import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';
import { TutorService } from '../tutor resources/tutor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  tutorLoggedInUserID: any;
  thisTutor: any;
  attendanceList: any = [];

  constructor(
    public dialog: MatDialog,
    private service: TutorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tutorLoggedInUserID = localStorage.getItem('id');
    this.getTutorLoggedInID();
  }

  getTutorLoggedInID() {
    this.service.getTutor(this.tutorLoggedInUserID).subscribe((result) => {
      this.thisTutor = result;
      console.log('tutor logged in ', this.thisTutor);
      this.getAttendanceListForTutor();
    });
  }

  getAttendanceListForTutor() {
    this.service.getAttendanceList(this.thisTutor.id).subscribe((res) => {
      this.attendanceList = res;
      console.log('the attendance list', this.attendanceList);
    });
  }

  openDialog(obj) {
    this.service.sessionInstance = obj;
    console.log('session chosen to take attendance for', this.service.sessionInstance);
    const dialogRef = this.dialog.open(TakeAttendanceComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAttendanceListForTutor();
    });
  }

  delete() {
    Swal.fire({
      title: 'Are you sure you want to delete the attendance?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', 'Successfully deleted attendance', 'success');
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

  nottaken() {
    Swal.fire({
      icon: 'error',
      title: 'The attendance for this session has not been taken yet ',
      confirmButtonText: 'Okay',
    });
  }

  confirmed() {
    Swal.fire({
      title: 'Are you sure you want to submit the attendance?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', 'Successfully submitted attendance', 'success');
      }
    });
  }
}
