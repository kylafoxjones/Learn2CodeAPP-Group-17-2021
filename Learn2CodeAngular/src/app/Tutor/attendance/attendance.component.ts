import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';
import { TutorService } from '../tutor resources/tutor.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { NbLayoutModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  tutorLoggedInUserID: any;
  thisTutor: any;
  attendanceList: any = [];
  data: any;
  search;
  
   //pagination
   page1:number = 1;
   totalLength1:any;

  constructor(
    public dialog: MatDialog,
    private service: TutorService,
    private router: Router
  ) {}

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

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
    console.log(
      'session chosen to take attendance for',
      this.service.sessionInstance
    );
    if (this.service.sessionInstance.attendanceTaken === false) {
      Swal.fire({
        title:
          'Attendance has not been taken yet for this session. Do you want to do it?',
        text: '',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          const dialogRef = this.dialog.open(TakeAttendanceComponent, {
            width: '900px',
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.getAttendanceListForTutor();
          });
        }
      });
    } else {
      Swal.fire({
        title:
          'you have already taken attendance for this session. Do you want to edit it?',
        text: '',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          const dialogRef = this.dialog.open(TakeAttendanceComponent, {
            width: '900px',
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.getAttendanceListForTutor();
          });
        }
      });
    }
  }

  delete(obj) {
    console.log('the id of the one you deleting', obj.id);
    Swal.fire({
      title: 'Are you sure you want to delete the attendance for this session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteAttendance(obj.id).subscribe(
          (result) => {
            this.data = result;
            Swal.fire('Deleted!', this.data.message, 'success');
            this.getAttendanceListForTutor();
          },
          (error) => {
            Swal.fire('Error!', error.error, 'error');
            this.getAttendanceListForTutor();
          }
        );
      }
    });
  }

  // search() {
  //   Swal.fire({
  //     icon: 'warning',
  //     title: 'No matches Found',
  //     confirmButtonText: 'Ok',
  //   });
  // }

  // nottaken() {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'The attendance for this session has not been taken yet ',
  //     confirmButtonText: 'Okay',
  //   });
  // }

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
     //   this.router.navigate(['/finalize'])
      }
      this.router.navigate(['/finalize']);
    });
   // this.router.navigate(['/finalize']);
  }

  
}
