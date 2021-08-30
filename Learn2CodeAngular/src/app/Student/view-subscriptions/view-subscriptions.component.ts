import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { StudentService } from '../Student resources/student.service';

@Component({
  selector: 'app-view-subscriptions',
  templateUrl: './view-subscriptions.component.html',
  styleUrls: ['./view-subscriptions.component.scss'],
})
export class ViewSubscriptionsComponent implements OnInit {
  userId: any;
  student: any = {};
  search;
  subscriptionList: any = [];

  constructor(
    private service: StudentService,
    private route: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getStudentLoggedIn();
  }

  getStudentLoggedIn() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getStudent(this.userId).subscribe((result) => {
      this.student = result;
      console.log('the student logged in', this.student);
      this.getSubscriptions();
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.route.navigate(['/loginhomepage/login']);
  };

  profile() {
    this.route.navigate(['/profile']);
  }
  getSubscriptions() {
    this.service.getBoughtSubscriptions(this.student.id).subscribe((res) => {
      this.subscriptionList = res;
      console.log('the subscription list', this.subscriptionList);
    });
  }
}
