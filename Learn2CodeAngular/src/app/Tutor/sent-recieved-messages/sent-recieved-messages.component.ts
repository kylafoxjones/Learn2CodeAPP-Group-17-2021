import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TutorService } from '../tutor resources/tutor.service';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-sent-recieved-messages',
  templateUrl: './sent-recieved-messages.component.html',
  styleUrls: ['./sent-recieved-messages.component.scss'],
})
export class SentRecievedMessagesComponent implements OnInit {
  search;
  MessagesSent: any;
  MessagesRecieved: any;
  recieverID: any;
  tutorID: any;
  data: any;
  tutor: any;
  userId: any;
   //pagination
   totalLength: any;
   page: number = 1;
   page1: number = 1;
   totalLength1: any;


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: TutorService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getTutor(this.userId).subscribe((result) => {
      this.tutor = result;});
    this.getTutorId();
    this.getMessagesSent();
    this.getRecievedMessages();
  }
  
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  getTutorId() {
    // this fux gets the id of the tutor that is logged in
    //it is needed so the api knows whos messages it should pull from the db
    //right now we hard coding this
   // this.tutorID = '52a9547b-4255-4152-8cd0-a9fae9e71746';
   // this.recieverID = '52a9547b-4255-4152-8cd0-a9fae9e71746';
   this.tutorID  = localStorage.getItem('id');
   this.recieverID = localStorage.getItem('id');
  }

  getMessagesSent() {
    this.service.getSentMessagesForTutor(this.tutorID).subscribe((result) => {
      this.MessagesSent = result;
      console.log(
        'these are the messages sent from the tutor logged in',
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

  viewReceivedMessage(messageObj) {
    Swal.fire({
      title:
        'Message from ' +
        messageObj.student.studentName +
        ' ' +
        messageObj.student.studentSurname +
        ': ',
      text: messageObj.messageSent,
    });
  }

  getRecievedMessages() {
    this.service
      .getRecievedMessagesForTutor(this.recieverID)
      .subscribe((result) => {
        this.MessagesRecieved = result;
        console.log(
          'these are the recieved messages for the tutor logged in',
          this.MessagesRecieved
        );
      });
  }

  deleteSentMessage(id) {
    console.log('the id of the message', id);
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
        this.service.deleteMessages(id).subscribe(
          (result) => {
            this.data = result;
            Swal.fire('Deleted!', this.data.message, 'success');
            this.getMessagesSent();
          },
          (error) => {
            Swal.fire('Error!', error.error, 'error');
            this.getMessagesSent();
          }
        );
      }
    });
  }
}
