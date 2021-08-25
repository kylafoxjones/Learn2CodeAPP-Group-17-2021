import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../tutor resources/tutor.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit {
  timeList:any=[];
  typeList:any=[];
  moduleList:any=[];
  typeChosen:any;
  timeChosen:any;
  moduleChosen:any;
  data:any={};

  constructor(  private service: TutorService ,   private dialogRef: MatDialogRef<CreateSessionComponent>) { }

  ngOnInit(): void {
    this.getTime();
    this.getType();
    this.getTutorModule();
  }

  getTime() {
    this.service
      .getSessionTime()
      .subscribe((result) => {
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
    this.service
      .getSessionType()
      .subscribe((result) => {
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
    this.service
.getModule()
      .subscribe((result) => {
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

  onCreate(){
    
      Swal.fire({
        title: 'Are you sure you want to add a Session?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
         this.data.ModuleId=this.moduleChosen;
         this.data.SessionTimeId=this.timeChosen;
         this.data.TutorSessionId=this.typeChosen;
         this.data.TutorId= 7;
         console.log("data to send to api",this.data);
          this.service.createSession(this.data).subscribe((result) => {
            
            this.data = result;
            
            this.dialogRef.close();
            Swal.fire(
              'Session has been created!',
              this.data.message,
              'success'
            );
          });
        }
      });
    }



}
