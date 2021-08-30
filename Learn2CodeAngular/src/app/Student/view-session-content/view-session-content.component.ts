




import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../Student resources/student.service';
import { Router } from '@angular/router';
import { SanityChecks } from '@angular/material/core';

@Component({
  selector: 'app-view-session-content',
  templateUrl: './view-session-content.component.html',
  styleUrls: ['./view-session-content.component.scss']
})
export class ViewSessionContentComponent implements OnInit {
  search;
  content: any;
  contentList: any;
  userID: any;
  student: any;
  thissStudent:any;
  userId:any;
  constructor(
    public dialog: MatDialog,
    private service: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudentInfo();
    this.getAllSessionContent();
  }

  getAllSessionContent() {
    //logged in tutor is hardcoded for now
    this.userID = localStorage.getItem('id');
    console.log("in the function",this.userID); 
    this.service.getStudent(this.userID).subscribe((res) => {
      this.student =res;
      console.log('student user', this.student);
      this.service.studentId = this.student.id;
      this.service.getGroupSessionsContent(this.service.studentId).subscribe((result) => {
          this.contentList = result;
          console.log('list of sessions for a specific student', this.contentList);
        });
    });
  }
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
  getStudentInfo() {
    //to get the student info for the circle at the top
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getStudent(this.userId).subscribe((result) => {
      this.thissStudent = result;
      console.log('student info on view session content component', this.thissStudent);
    });
  }
  navigateToSpecificSession(obj) {
    this.service.SessionTitle = obj.bookingInstance.title;
    this.service.bookinginstance = obj;
    console.log("selected obj",obj.bookingInstanceId);
    console.log('Booking instance', this.service.bookinginstance);
    this.service.bookingInstanceID=obj.bookingInstanceId;
    console.log(this.service.bookingInstanceID);
    this.router.navigateByUrl('/specificsessioncontent');
  }
}
