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
ticketsleft:any =0;

bookingObj: any = {};
ticketobj: any ={};
  constructor(private service: StudentService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateBookingComponent>) { }

  ngOnInit(): void {
    console.log( this.service.ticketsleft)
    this.ticketsleft = this.service.ticketsleft;
    console.log(this.ticketsleft)
  }

  book() {
    this.bookingObj = {
      BookingInstanceId: this.service.bookingInstanceID,
      StudentId: this.service.studentIdBooking,
      ModuleId: this.service.moduleID,
      Description: this.data.Description,
    };
   

  

    Swal.fire({
      title: 'Are you sure you want to make the booking?',
      text: 'you have '+ this.ticketsleft+ ' tickets remaining for this module',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.makeBooking(this.bookingObj).subscribe((result) => {
          this.data = result;
          Swal.fire('Successful Booking', '', 'success');
        this.dialogRef.close();
        }
        ,
        (error) => {
          
          Swal.fire('Error!', error.error, 'error');
        
        });
       
      }
    },

      (error) => {
        Swal.fire('Error!', error.error, 'error');
        this.dialogRef.close();
      }
    );


    
  }

}
