import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CreateMessageComponent } from './create-message/create-message.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TutorService } from '../tutor resources/tutor.service';
import { NbAccordionItemHeaderComponent } from '@nebular/theme';

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

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: TutorService
  ) {}

  ngOnInit(): void {
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
