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

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: StudentService
  ) {}

  ngOnInit(){
    this.getAllTutors();
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
