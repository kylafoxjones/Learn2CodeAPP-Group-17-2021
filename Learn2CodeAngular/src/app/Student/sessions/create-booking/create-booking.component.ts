import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from '../../Student resources/student.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {
data:any ={};

bookingObj: any = {};

  constructor(private service: StudentService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateBookingComponent>) { }

  ngOnInit(): void {
  }

  book() {
    this.bookingObj = {
      BookingInstanceId: this.service.bookingInstanceID,
      StudentId: this.service.studentIdBooking,
      ModuleId: this.service.moduleID,
      Description: this.data.Description,
    };
    this.service.makeBooking(this.bookingObj).subscribe(
      (result) => {
        this.data = result;
        Swal.fire('Booked!', this.data.message, 'success');
        this.dialogRef.close();
      },
      (error) => {
        Swal.fire('Error!', error.error, 'error');
        this.dialogRef.close();
      }
    );
  }

}
