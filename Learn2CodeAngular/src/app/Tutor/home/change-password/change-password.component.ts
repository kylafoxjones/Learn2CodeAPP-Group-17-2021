import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TutorService } from '../../tutor resources/tutor.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  userId: any;
  passwordData: any = {};
  data: any = {};
  confirm: any = {};
  passwordsMatch = false;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private service: TutorService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.passwordData.Id = this.userId;
  }

  confirmed() {
    console.log('password', this.passwordData.Password);
    console.log('the confirmation password input', this.confirm.cPassword);
    this.checkPassword();
    if (this.passwordsMatch === true) {
      console.log('dto sending to api', this.passwordData);
      this.changePasswordForGood();
    } else {
      // if passwords dont match
      console.log(this.passwordsMatch);
      //show error
      Swal.fire({
        icon: 'error',
        title: 'Try again',
        text: 'Your passwords do not match',
        confirmButtonText: 'Ok',
      });
    }
  }

  checkPassword() {
    if (this.data.password === this.confirm.password) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
    console.log(this.passwordsMatch);
  }

  changePasswordForGood() {
    Swal.fire({
      title: 'Do you want to confirm your new password?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
        this.service.changePassword(this.passwordData).subscribe(
          (result) => {
            this.data = result;
            Swal.fire('New password saved!', this.data.message, 'success');
          },
          (error) => {
            Swal.fire('Error!', error.error, 'error');
          }
        );
      }
    });
  }
}
