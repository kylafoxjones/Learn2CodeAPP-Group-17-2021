import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Student resources/student.service';
import { Router } from '@angular/router';
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
  constructor(private service: StudentService,  private router: Router) {}

   //pagination
   page1:number = 1;
   totalLength1:any;

   page:number = 1;
   totalLength:any;

  // constructor(private service: StudentService) {}

  ngOnInit() {
    this.getStudentLoggedIn();
    this.getGroupSessionList();
  }
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
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
 

  profile() {
    this.router.navigate(['/profile']);
  }
}
