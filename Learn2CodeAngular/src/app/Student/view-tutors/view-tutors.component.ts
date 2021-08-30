import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CreateMessageComponent } from './create-message/create-message.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentService } from '../Student resources/student.service';
import { NbAccordionItemHeaderComponent } from '@nebular/theme';

@Component({
  selector: 'app-view-tutors',
  templateUrl: './view-tutors.component.html',
  styleUrls: ['./view-tutors.component.scss'],
})
export class ViewTutorsComponent implements OnInit {
  //declare variables
  tutorList: any = [];
  messages: any;
  search;
  //pagination
  page1:number = 1;
  totalLength1:any;
  thisStudent:any={};
  userId:any;

  page:number = 1;
  totalLength:any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: StudentService
  ) {}

  ngOnInit(){
    this.getAllTutors();
    this.getLoggedInUser();
  }
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
  getLoggedInUser() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getStudent(this.userId).subscribe((res) => {
      this.thisStudent = res;
      console.log('student logged in ts file', this.thisStudent);
     
     
    });
  }

  createMessage(obj) {
    this.service.tutorObj = obj;
    console.log(this.service.tutorObj);
    this.service.title = 'Send Message';
    const dialogRef = this.dialog.open(CreateMessageComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTutors();
    });
  }

  getAllTutors() {
    this.service.getTutorss().subscribe((result) => {
      this.tutorList = result;
      console.log('list of tutors',this.tutorList);
    });
  }
}
