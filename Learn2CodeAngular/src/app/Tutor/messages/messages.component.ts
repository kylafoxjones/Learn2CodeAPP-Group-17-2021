import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CreateMessageComponent } from './create-message/create-message.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TutorService } from '../tutor resources/tutor.service';
import { NbAccordionItemHeaderComponent } from '@nebular/theme';
import { MatMenuModule } from '@angular/material/menu';
import { NbLayoutModule } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  //declare variables
  studentList: any = [];
  messages: any;
  search;
  tutor: any;
  userId: any;
   //pagination
   page1:number = 1;
   totalLength1:any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: TutorService
  ) {}

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
  
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getTutor(this.userId).subscribe((result) => {
      this.tutor = result;});
    this.getAllStudents();
  }

  createMessage(obj) {
    this.service.studentObj = obj;
    console.log(this.service.studentObj);
    this.service.title = 'Send Message';
    const dialogRef = this.dialog.open(CreateMessageComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllStudents();
    });
  }

  getAllStudents() {
    this.service.getStudents().subscribe((result) => {
      this.studentList = result;
      console.log(this.studentList);
    });
  }
}
