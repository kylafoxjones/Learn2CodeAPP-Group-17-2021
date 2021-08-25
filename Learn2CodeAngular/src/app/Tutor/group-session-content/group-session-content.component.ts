import { Component, OnInit } from '@angular/core';
import { AddGroupSessionContentComponent } from './add-group-session-content/add-group-session-content.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TutorService } from '../tutor resources/tutor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-session-content',
  templateUrl: './group-session-content.component.html',
  styleUrls: ['./group-session-content.component.scss'],
})
export class GroupSessionContentComponent implements OnInit {
  search;
  content: any;
  contentList: any;
  userID: any;
  tutor: any;
  constructor(
    public dialog: MatDialog,
    private service: TutorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllSessionContent();
  }

  getAllSessionContent() {
    //logged in tutor is hardcoded for now
    this.userID = localStorage.getItem('id');
    console.log(this.userID);

    this.tutor = this.service.getTutor(this.userID);
    console.log('tutor user', this.tutor);
    this.service.tutorId = this.tutor.id;

    this.service
      .getAllTutorSessions(this.service.tutorId)
      .subscribe((result) => {
        this.contentList = result;
        console.log('list of sessions for a specific tutor', this.contentList);
      });
  }

  navigateToSpecificSession(obj) {
    this.service.SessionTitle = obj.title;
    this.service.bookinginstance = obj;
    console.log('Booking instance', this.service.bookinginstance);
    console.log(this.service.bookinginstance.id);
    this.router.navigateByUrl('/specificsession');
  }
}
