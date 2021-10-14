import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { CreateSessionComponent } from './create-session/create-session.component';
import { MatDialog } from '@angular/material/dialog';
import { TutorService } from '../tutor resources/tutor.service';
import { MaintainSessionComponent } from './maintain-session/maintain-session.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FinalizeComponent } from './finalize/finalize.component';
import { ViewgroupSessionComponent } from './viewgroup-session/viewgroup-session.component';
import { DatePipe } from '@angular/common';
import { ViewindvidualsessionComponent } from './viewindvidualsession/viewindvidualsession.component';
import { Calendar, CalendarOptions,FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking






@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  providers: [DatePipe]
})

export class SessionComponent implements OnInit {
  
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  indivSessions: any = [];
  groupSessions: any = [];
  userId: any;
  tutor: any = {};
  data: any;
//pagination
totalLength: any;
page: number = 1;
page1: number = 1;
totalLength1: any;
Events:any = [];
calendarOptions: CalendarOptions;
changes:boolean=true;


fullCalendarEvents:boolean=true;


today = new Date();
  constructor(private datePipe: DatePipe,public dialog: MatDialog, private service: TutorService, private router: Router) {}

  ngOnInit() {
   
   console.log(this.datePipe)
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getTutor(this.userId).subscribe((result) => {
      this.tutor = result;
      this.getcalendarSessions();
      console.log('tutor info', this.tutor);
      console.log('tutor id', this.tutor.id);
      this.getMyIndivSessions();
      this.getMyGroupSessions();
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
        //full calendar setting and event binding
         this.calendarOptions = {
             initialView: 'dayGridMonth',
             height:650,
             eventClick:function(arg){
              
              Swal.fire({
               
                title: ' Session details',
                text: arg.event.title,
                
              })
            },
            
             events: this.Events

            };
         },1000);
     
    });
    
    
     
  }

  

  openAddDialog() {
    const dialogRef = this.dialog.open(CreateSessionComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((result) => {
     
      this.getcalendarSessions();
      this.getMyIndivSessions();
      this. getMyGroupSessions();
     
      this.service.getcalendarSessions(this.tutor.id).subscribe((res) => {
     
        this.Events = res;
         console.log("yes", this.Events);
         this.calendarOptions.events = this.Events;
         this.someMethod()
         
       });
      
    });
    
  }
  openFinalize(obj){
    this.service.sessionToFinalize = obj;
    const dialogRef = this.dialog.open(FinalizeComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getMyGroupSessions();
      this.getMyIndivSessions();
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };


  getMyIndivSessions() {
    this.service.getMyIndivSessions(this.tutor.id).subscribe((res) => {
      this.indivSessions = res;
      console.log('my indiv sessions', this.indivSessions);
    });
  }

  getMyGroupSessions() {
    this.service.getMyGroupSessions(this.tutor.id).subscribe((res) => {
      this.groupSessions = res;
      console.log('my group sessions', this.groupSessions);
    });
  }

  getcalendarSessions() {
    this.service.getcalendarSessions(this.tutor.id).subscribe((res) => {
     
     this.Events = res;
      console.log( this.Events);
    });
  }

  editSession(obj) {
    this.service.sessionToEdit = obj;
    console.log('the session to edit', this.service.sessionToEdit);
    const dialogRef = this.dialog.open(MaintainSessionComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getMyGroupSessions();
      
      this.getMyIndivSessions();
      
      
      this.service.getcalendarSessions(this.tutor.id).subscribe((res) => {
     
        this.Events = res;
         console.log("yes", this.Events);
         this.calendarOptions.events = this.Events;
         this.someMethod()
         
       });
    });

  }

  deleteSession(obj) {
    Swal.fire({
      title: 'Are you sure you want to delete this session?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteSession(obj.id).subscribe(
          (result) => {
            this.data = result;
            Swal.fire(
              'session successfully deleted!',
              this.data.message,
              'success'
            );
            this.getMyGroupSessions();
           
            this.getMyIndivSessions();
            this.service.getcalendarSessions(this.tutor.id).subscribe((res) => {
     
              this.Events = res;
               console.log("yes", this.Events);
               this.calendarOptions.events = this.Events;
               this.someMethod()
               
             });
          },
          (error) => {
            Swal.fire('Error!', error.error, 'error');
            this.getMyGroupSessions();
            this.getMyIndivSessions();
          }
        );
      }
    });
  }

  viewgroupreg(ID){
    console.log(ID)
    //this.service.sessionToFinalize = obj;
    const dialogRef = this.dialog.open(ViewgroupSessionComponent, {
      width: '800px',
      data: ID
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getMyGroupSessions();
      this.getMyIndivSessions();
    });
  }

  viewindreg(ID){
    console.log(ID)
    //this.service.sessionToFinalize = obj;
    const dialogRef = this.dialog.open(ViewindvidualsessionComponent, {
      width: '900px',
      data: ID
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getMyGroupSessions();
      this.getMyIndivSessions();
     
    });
  }

  someMethod() {
    let calendarApi = this.calendarComponent.getApi();
   
    setTimeout( function() {
      //window.dispatchEvent(new Event('resize'))
      
      calendarApi.addEvent(this.Event);
      
      
  }, 8)

  
      
      
    }


  
    
  
 
}
