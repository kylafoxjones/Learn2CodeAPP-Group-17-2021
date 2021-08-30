import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../Student resources/student.service';

@Component({
  selector: 'app-view-group-sessions',
  templateUrl: './view-group-sessions.component.html',
  styleUrls: ['./view-group-sessions.component.scss'],
})
export class ViewGroupSessionsComponent implements OnInit {
  groupSessionList: any = [];
  userId: any;
  student: any = {};
  search
  constructor(private service: StudentService,private router: Router,) {}

  ngOnInit() {
    this.getStudentLoggedIn();
    this.getGroupSessionList();
  }

  getStudentLoggedIn() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getStudent(this.userId).subscribe((result) => {
      this.student = result;
      console.log('the student logged in', this.student);
    });
  }

  getGroupSessionList() {
    this.service.getGroupSessions( this.userId).subscribe((res) => {
      this.groupSessionList = res;
      console.log('the group session list',this.groupSessionList);
    });
  }
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  profile() {
    this.router.navigate(['/profile']);
  }
}
