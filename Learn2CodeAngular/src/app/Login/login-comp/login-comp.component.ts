import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
//import{ForgotpasswordComponent} from './forgotpassword/forgotpassword.component'
import Swal from 'sweetalert2';
import { Login } from '../models/login.model';
import { AuthResponseDto } from '../models/auth-response-dto.model';
import { LoginService } from '../login.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';


@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss'],
})
export class LoginCompComponent implements OnInit {
  login: Login = <Login>{};
  private _returnUrl: string;

  constructor(
    private route: Router,
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private service: LoginService
  ) {}

  ngOnInit(): void {
    //this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  Log(): void {
    console.log(this.login); //it gets this
    this.service.LoginUser(this.login).subscribe((result) => {
      localStorage.setItem('token', result.token); //works
      localStorage.setItem('id', result.id);
      console.log(result);
      //this._router.navigate([this._returnUrl]);
      if ((result.type == 'Student')) {
        this.route.navigate(['/studenthomepage/studenthome']);
      } else if ((result.type == 'Tutor')) {
        this.route.navigate(['/tutorhomepage/tutorhome']);
      } else if ((result.type == 'Admin')) {
        this.route.navigate(['/adminhomepage/adminhome']);
      }
    }, (error) => {

      Swal.fire('Error!', error.error, 'error');});
  }
  openForget(){
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
   //   Swal.fire('Email sent successfully', '', 'success');
    });

  }

}
