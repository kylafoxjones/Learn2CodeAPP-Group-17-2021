import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { StudentService } from '../../Student resources/student.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.scss'],
})
export class CreateFeedbackComponent implements OnInit {
  bookingInstaneId: any;
  data: any = {};

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateFeedbackComponent>,
    private service: StudentService
  ) {}

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    // you need the student id and the booking instance id to create feedback
    // this will be hrd coded for now
    this.bookingInstaneId = this.service.bookingInstanceID;
    console.log(
      'the booking instance id of the one you want to create feedback for',
      this.bookingInstaneId
    );
  }

  createFeedback() {
    console.log('feedback input from student', this.data);
    let feebackObjToSend = {
      Friendliness: this.data.Friendliness,
      Timliness: this.data.Timeliness,
      Ability: this.data.Ability,
      Description: this.data.Description,
      StudentId: this.service.studentId,
      BookingInstanceId: this.bookingInstaneId,
    };
    console.log('feedback to send to api', feebackObjToSend);
    Swal.fire({
      title: 'Are you sure you want to give this feedback?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.createFeedbackForSession(feebackObjToSend).subscribe(
          (result) => {
            this.data = result;
            Swal.fire('Feedback Complete!', this.data.message, 'success');
            this.dialogRef.close();
          },
          (error) => {
            Swal.fire('Error!', error.error, 'error');
            this.dialogRef.close();
          }
        );
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
