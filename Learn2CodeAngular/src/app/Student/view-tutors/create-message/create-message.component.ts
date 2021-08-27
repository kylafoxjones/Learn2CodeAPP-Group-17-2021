import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudentService } from '../../Student resources/student.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
})
export class CreateMessageComponent implements OnInit {
  tutor: any;
  data: any = {};
  messageObj: any = {};

  // these wont need to exist below when there is proper functionality to get the tutor thats signed in
  senderId: any;
  studentId: any;
  thisStudent:any;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<CreateMessageComponent>,
    private service: StudentService
  ) {}

  ngOnInit() {
    this.tutor = this.service.tutorObj;
    this.getStudentInfo();
  }

  getStudentInfo() {
    //need to get the userId of the student that is logged in
    //it will then be used in the funx below as "SenderId" to send messages
    //it will also be used as recieverId to look at recieved messages
    //maybe get the entire object of student
   // this.senderId = '02174cf0–9412–4cfe - afbf - 59f706d72cf6';
   //need the actual student id 
    this.senderId = localStorage.getItem('id');
    console.log(this.senderId);
    this.service.getStudent(this.senderId).subscribe((result) => {
      this.thisStudent = result;
      this.studentId = this.thisStudent.id;
      console.log('student id ',this.studentId)
    
    });
  }

  sendMessage() {
    this.messageObj = {
      SenderId: this.senderId,
      ReceiverId: this.service.tutorObj.userId,
      MessageSent: this.data.Message,
      TutorId: this.service.tutorObj.id,
      StudentId: this.studentId,
    };
    console.log('the message dto sent', this.messageObj);
    this.service.createMessages(this.messageObj).subscribe((result) => {
      Swal.fire('message has been sent!', this.data.message, 'success');
      this.dialogRef.close();
    });
  }
}