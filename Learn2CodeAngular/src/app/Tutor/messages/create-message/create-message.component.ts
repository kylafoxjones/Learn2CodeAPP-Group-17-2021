import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TutorService } from '../../tutor resources/tutor.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
})
export class CreateMessageComponent implements OnInit {
  student: any;
  data: any = {};
  messageObj: any = {};

  // these wont need to exist below when there is proper functionality to get the tutor thats signed in
  senderId: any;
  tutorId: any;
  tutor: any = {};

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<CreateMessageComponent>,
    private service: TutorService
  ) {}

  ngOnInit() {
    this.student = this.service.studentObj;
    this.getSenderInfo();
  }

  getSenderInfo() {
    //need to get the userId of the tutor that is logged in
    //it will then be used in the funx below as "SenderId" to send to api
    //maybe get the entire object of tutor
    // this.senderId = '52a9547b-4255-4152-8cd0-a9fae9e71746';
    //this.tutorId = 6;
    this.senderId = localStorage.getItem('id');
    this.service.getTutor(this.senderId).subscribe((result) => {
      this.tutor = result;
      console.log('the tutor', this.tutor);
      this.tutorId = this.tutor.id;
      console.log('the tutor id', this.tutorId);
    });
  }

  sendMessage() {
    this.messageObj = {
      SenderId: this.senderId,
      ReceiverId: this.service.studentObj.userId,
      MessageSent: this.data.Message,
      StudentId: this.service.studentObj.id,
      TutorId: this.tutorId,
    };
    console.log('the message dto sent', this.messageObj);
    this.service.createMessages(this.messageObj).subscribe((result) => {
      Swal.fire('message has been sent!', this.data.message, 'success');
      this.dialogRef.close();
    });
  }
}
