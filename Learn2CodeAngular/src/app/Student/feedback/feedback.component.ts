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
  myFeedbackList: any = [];
  data: any;
  thisStudent: any;
  userId: any;
  pastSessionList: any = [];
  //studentId:any;
 //pagination
 page1:number = 1;
 totalLength1:any;
 
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: StudentService
  ) {}

  ngOnInit() {
    this.getLoggedInUser();
    this.getMyFeedback();
  }
  getLoggedInUser() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getStudent(this.userId).subscribe((res) => {
      this.thisStudent = res;
      console.log('student logged in ts file', this.thisStudent);
      this.service.studentId = this.thisStudent.id;
      console.log('student id kept in the service', this.service.studentId);
      this.getSessions();
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
  getSessions() {
    // get sessions that the student has attented
    this.service.getSessions(this.thisStudent.id).subscribe((res) => {
      this.pastSessionList = res;
      console.log('past sessions for logged in student', this.pastSessionList);
    });
    this.getMyFeedback();
  }

  delete(item) {
    console.log('feedback sent to delete', item);
    console.log('student ID:', this.service.studentId);
    Swal.fire({
      title: 'Are you sure you want to delete the feedback',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service
          .deleteFeedback(this.service.studentId, item.bookingInstanceId)
          .subscribe(
            (result) => {
              this.data = result;
              Swal.fire(
                'Feedback successfully deleted!',
                this.data.message,
                'success'
              );
              this.getMyFeedback();
            },
            (error) => {
              Swal.fire('Error!', error.error, 'error');
              this.getMyFeedback();
            }
          );
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

  openDialog(bookingInstanceID) {
    this.service.bookingInstanceID = bookingInstanceID;
    const dialogRef = this.dialog.open(CreateFeedbackComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Feedback already exists for this session',
      //     confirmButtonText: 'Okay',
      //   });
      this.getSessions();
    this.getMyFeedback();
    });
    this.getSessions();
    this.getMyFeedback();
  }

  getMyFeedback() {
    this.service.getMyFeedback(this.thisStudent.id).subscribe((result) => {
      this.myFeedbackList = result;
      console.log(
        'Myfeedback list for the student logged in',
        this.myFeedbackList
      );
    });
  }

  viewMyFeedback(feedbackObj) {
    Swal.fire({
      title:
        'Your feedback for ' +
        feedbackObj.bookingInstance.tutor.tutorName +
        ' ' +
        feedbackObj.bookingInstance.tutor.tutorSurname +
        ': ',
      text:
        'Friendliness: ' +
        feedbackObj.friendliness +
        '. Ability: ' +
        feedbackObj.ability +
        '. Timliness: ' +
        feedbackObj.timliness +
        '. Description: ' +
        feedbackObj.description,
    });
  }
}
