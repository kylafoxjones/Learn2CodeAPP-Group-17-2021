import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgotpasswordDto } from '../models/forgotpassword-dto.model';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
form: ForgotpasswordDto = <ForgotpasswordDto>{};

  constructor(private LoginService: LoginService,private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }


  public forgotPassword () {

      this.form.clientURI= 'http://localhost:4200/resetpassword';
    this.LoginService.forgotPassword('api/Login/ForgotPassword', this.form)
    .subscribe(_ => {
    console.log("SUCCESS");
    Swal.fire('Success', 'Please check your email', 'success');
    this.dialogRef.closeAll();
    },
    err => {
      Swal.fire('Error!', err.error, 'error');
     console.log("error");
    })
  }
}
