import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordDto } from '../models/reset-password-dto.model';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private _token: string;
  private _email: string;
  confirm: any = {};
  data: any = {};
  passwordsMatch = false;
  form: ResetPasswordDto = <ResetPasswordDto>{};

  constructor( private _route: ActivatedRoute, private LoginService : LoginService, private route: Router) { }

  ngOnInit(): void {
    this._token = this._route.snapshot.queryParams['token'];
    this._email = this._route.snapshot.queryParams['email'];
  }
  // public resetPassword() {
  // this.form.token=this._token;
  // this.form.email=this._email;



  //   this.LoginService.resetPassword('api/Login/ResetPassword', this.form)
  //   .subscribe(_ => {
  //  console.log("success");
  //   },
  //   error => {
  //     Swal.fire('Error!', error.error, 'error');
  //     console.log("error");
  //   })



  // }

  resetPassword() {
    console.log('password', this.form.password);
    console.log('the confirmation password input', this.confirm.password);
    this.checkPassword();
    if (this.passwordsMatch === true) {
      console.log('dto sending to api', this.form);
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
    if (this.form.password === this.confirm.password) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
    console.log(this.passwordsMatch);
  }

  changePasswordForGood() {
    this.form.token=this._token;
  this.form.email=this._email;
    Swal.fire({
      title: 'Do you want to confirm your new password?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.dialogRef.close();
        this.LoginService.resetPassword('api/Login/ResetPassword', this.form)
    .subscribe(
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
