import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { StudentService } from '../Student resources/student.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent implements OnInit {
  userId: any;
  thisStudent: any = {};
  moduleList: any = [];
  moduleChosen: any;
  studentId: any;
  nameArr: any = [];
  bookings: any = [];
  search;
  bookingObj: any = {};
  desc = '';
  data: any;

  constructor(private service: StudentService,  private router: Router) {}

  ngOnInit() {
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
      this.studentId = this.thisStudent.id;
      console.log('student logged in', this.thisStudent);
      this.getModules();
    });
  }

  getModules() {
    // pick a module from the drop down in schedule
    this.service.Getbookingindiv(this.studentId).subscribe((result) => {
      this.moduleList = result;
      console.log('modules to pick from', this.moduleList);
    });
  }

  selectmodule(event) {
    this.nameArr = event.split(',');
    console.log(this.nameArr);
  }

  avail() {
    this.service
      .Available(this.nameArr[0], this.nameArr[1])
      .subscribe((res) => {
        console.log(res);
        this.bookings = res;
      });
  }

  book(id) {
    this.bookingObj = {
      BookingInstanceId: id,
      StudentId: this.studentId,
      ModuleId: this.nameArr[0],
      Description: this.desc,
    };
    this.service.makeBooking(this.bookingObj).subscribe(
      (result) => {
        this.data = result;
        Swal.fire('Booked!', this.data.message, 'success');
      },
      (error) => {
        Swal.fire('Error!', error.error, 'error');
      }
    );
  }

  // selectmodule($event) {
  //   //get the module as input from user in dropdown
  //   this.moduleChosen = $event;
  //   console.log('module chosen', this.moduleChosen);
  // }
}
