import { Component, OnInit } from '@angular/core';
import { CreateSessionComponent } from './create-session/create-session.component';
import { MatDialog } from '@angular/material/dialog';
import { TutorService } from '../tutor resources/tutor.service';
import { MaintainSessionComponent } from './maintain-session/maintain-session.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FinalizeComponent } from './finalize/finalize.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
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

  constructor(public dialog: MatDialog, private service: TutorService, private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getTutor(this.userId).subscribe((result) => {
      this.tutor = result;
      console.log('tutor info', this.tutor);
      console.log('tutor id', this.tutor.id);
      this.getMyIndivSessions();
      this.getMyGroupSessions();
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CreateSessionComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getMyGroupSessions();
      this.getMyIndivSessions();
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

  editSession(obj) {
    this.service.sessionToEdit = obj;
    console.log('the session to edit', this.service.sessionToEdit);
    const dialogRef = this.dialog.open(MaintainSessionComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getMyGroupSessions();
      this.getMyIndivSessions();
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
}
