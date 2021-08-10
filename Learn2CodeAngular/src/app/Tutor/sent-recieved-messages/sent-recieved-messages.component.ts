import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TutorService } from '../tutor resources/tutor.service';

@Component({
  selector: 'app-sent-recieved-messages',
  templateUrl: './sent-recieved-messages.component.html',
  styleUrls: ['./sent-recieved-messages.component.scss'],
})
export class SentRecievedMessagesComponent implements OnInit {
  search;
  MessagesSent: any;
  tutorID: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: TutorService
  ) {}

  ngOnInit() {
    this.getTutorId();
    this.getMessagesSent();
  }

  getTutorId() {
    // this fux gets the id of the tutor that is logged in
    //it is needed so the api knows whos messages it should pull from the db
    //right now we hard coding this
    this.tutorID = '52a9547b-4255-4152-8cd0-a9fae9e71746';
  }

  getMessagesSent() {
    this.service.getSentMessagesForTutor(this.tutorID).subscribe((result) => {
      this.MessagesSent = result;
      console.log(
        'these are the messages for the tutor logged in',
        this.MessagesSent
      );
    });
  }

  viewMessage(messageObj) {
    Swal.fire({
      title:
        'The message you sent to ' +
        messageObj.student.studentName +
        ' ' +
        messageObj.student.studentSurname +
        ':',
      text: messageObj.messageSent,
    });
  }

  deleteSentMessage(id) {
    console.log('the id of the message', id)
    Swal.fire({
      title: 'Are you sure you want to delete this message?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteMessages(id).subscribe((result) => {
          this.getMessagesSent();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    });
  }
}
