import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../tutor resources/tutor.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss'],
})
export class CreateSessionComponent implements OnInit {
  timeList: any = [];
  typeList: any = [];
  moduleList: any = [];
  typeChosen: any;
  timeChosen: any;
  moduleChosen: any;
  data: any = {};
  userId: any;
  tutor: any = {};
  tutorID: any;
  modulexv: any;
  sessionxv: any;
  timex: any;


  constructor(
    private service: TutorService,
    private dialogRef: MatDialogRef<CreateSessionComponent>
  ) {}

  ngOnInit() {
    this.getTutor();
    this.getTime();
    this.getType();


  }

  getTutor() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getTutor(this.userId).subscribe((result) => {
      this.tutor = result;
      console.log('tutor info', this.tutor);
      this.tutorID = this.tutor.id;
      console.log('tutor id', this.tutorID);
      this.getTutorModule();
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
  getType() {
    this.service.getSessionType().subscribe((result) => {
      this.typeList = result;
      console.log('session types', this.typeList);
    });
  }
  selectType($event) {
    //for selected dropdown value
    console.log('this is the event', $event);
    this.typeChosen = $event;
    console.log(this.typeChosen);
  }
  getTutorModule() {
    console.log('the tutor id', this.tutorID);
    this.service.getModule(this.tutorID).subscribe((result) => {
      this.moduleList = result;
      console.log('session modules', this.moduleList);
    });
  }
  selectModule($event) {
    //for selected dropdown value
    console.log('this is the event', $event);
    this.moduleChosen = $event;
    console.log(this.moduleChosen);
  }

  onCreate() {
    Swal.fire({
      title: 'Are you sure you want to add a Session?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.ModuleId = this.moduleChosen;
        this.data.SessionTimeId = this.timeChosen;
        this.data.TutorSessionId = this.typeChosen;
        this.data.TutorId = this.tutorID;
        console.log('data to send to api', this.data);
        this.service.createSession(this.data).subscribe((result) => {
          this.data = result;
          this.dialogRef.close();
          Swal.fire('Session has been created!', this.data.message, 'success');
        });
      }
    });
  }
}
