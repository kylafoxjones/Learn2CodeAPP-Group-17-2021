import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from '../Student resources/student.service';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';


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
  myBookingList: any = [];

  data: any;
   //pagination
   page1:number = 1;
   totalLength1:any;

   page:number = 1;
   totalLength:any;

  constructor(
    private service: StudentService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getLoggedInUser();
    this.getMyBookingList();
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
      this.service.studentIdBooking = this.thisStudent.id;
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
    this.service.moduleID = this.nameArr[0];
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

  openPopUp(id) {
    this.service.bookingInstanceID = id;
    const dialogRef = this.dialog.open(CreateBookingComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getMyBookingList();
      this.avail();
    });
  }

  getMyBookingList() {
    this.service.getMyBookings(this.userId).subscribe((res) => {
      this.myBookingList = res;
      console.log('your bookings', this.myBookingList);
    });
  }

  open(obj) {
    this.service.bookingToEdit = obj;
    const dialogRef = this.dialog.open(EditBookingComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getMyBookingList();
      this.avail();
    });
  }
  delete(obj) {
    console.log('thing to delete', obj);
    Swal.fire({
      title: 'Are you sure you want to delete the booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletePastBooking(obj.id).subscribe(
          (result) => {
            this.data = result;
            Swal.fire(
              'Booking successfully deleted!',
              this.data.message,
              'success'
            );
            this.getMyBookingList();
          },
          (error) => {
            Swal.fire('Error!', error.error, 'error');
            this.getMyBookingList();
          }
        );
      }
    });
  }
}
