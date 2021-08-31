import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TutorService } from 'src/app/tutor/tutor resources/tutor.service';
import Swal from 'sweetalert2';
import { StudentService } from '../../Student resources/student.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.scss'],
})
export class EditBookingComponent implements OnInit {
  data: any = {};
  userId: any;
  thisStudent: any = {};
  studentId: any;
  timeList: any = [];
  timeChosen: any;
  editedBooking: any = {};
  timex: any;

  constructor(
    private service: StudentService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditBookingComponent>,
    private Tutorservice: TutorService
  ) {}

  ngOnInit() {
    this.getLoggedInUser();
    this.getTime();
  }

  getLoggedInUser() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getStudent(this.userId).subscribe((res) => {
      this.thisStudent = res;
      this.studentId = this.thisStudent.id;
      this.service.studentIdBooking = this.thisStudent.id;
      console.log('student logged in', this.thisStudent);
    });
  }

  getTime() {
    this.Tutorservice.getSessionTime().subscribe((result) => {
      this.timeList = result;
      console.log('session times', this.timeList);
    });
  }
  selectTime($event) {
    //for selected dropdown value
    console.log('this is the event', $event);
    this.timeChosen = $event;
    console.log(this.timeChosen);
  }

  editBooking() {
    console.log('the old booking',this.service.bookingToEdit);
    this.editedBooking = {
     Id: this.service.bookingToEdit.id,
      StudentId:this.studentId,
      SessionTimeId: this.timeChosen,
      date: this.data.Date,
      Message: this.data.Message,
    };
    this.service.editBooking(this.editedBooking).subscribe(
      (result) => {
        this.data = result;
        Swal.fire('Email sent to tutor!', this.data.message, 'success');
        this.dialogRef.close();
      },
      (error) => {
        Swal.fire('Error!', error.error, 'error');
        this.dialogRef.close();
      }
    );
  }
}
