import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TutorService } from '../../tutor resources/tutor.service';

@Component({
  selector: 'app-maintain-session',
  templateUrl: './maintain-session.component.html',
  styleUrls: ['./maintain-session.component.scss'],
})
export class MaintainSessionComponent implements OnInit {
  data = this.service.sessionToEdit;
  userId: any;
  tutor: any = {};
  updatedSession: any = {};
  timeList: any = [];
  typeList: any = [];
  moduleList: any = [];
  typeChosen: any;
  timeChosen: any;
  moduleChosen: any;
  tutorID: any;
  newDate:any;
  timex: any;

  constructor(
    private service: TutorService,
    private dialogRef: MatDialogRef<MaintainSessionComponent>
  ) {}

  ngOnInit() {
    this.getTutor();
    console.log('the sessions to edit', this.data);
    this.getTime();
  }

  getTutor() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getTutor(this.userId).subscribe((result) => {
      this.tutor = result;
      this.tutorID = this.tutor.id;
    });
    // this.getTutorModule();
  }

  getTime() {
    this.service.getSessionTime().subscribe((result) => {
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

  onCreate() {
    Swal.fire({
      title: 'Are you sure you want to update this Session?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updatedSession.SessionTimeId = this.data.moduleId;
        this.updatedSession.TutorSessionId = this.data.tutorSessionId;
        this.updatedSession.TutorId = this.tutorID;
        this.updatedSession.Id = this.data.id;
        this.updatedSession.Link = this.data.link;
        this.updatedSession.SessionTimeId = this.timeChosen;
        this.updatedSession.Title = this.data.title;
        this.updatedSession.Date = this.newDate;
        console.log('data to send to api', this.updatedSession);
        this.service.updateSession(this.updatedSession).subscribe(
          (result) => {
            this.data = result;
            Swal.fire(
              'session successfully updated!',
              this.data.message,
              'success'
            );
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
}
