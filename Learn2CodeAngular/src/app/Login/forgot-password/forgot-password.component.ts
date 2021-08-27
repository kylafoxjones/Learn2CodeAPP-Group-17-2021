import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgotpasswordDto } from '../models/forgotpassword-dto.model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
form: ForgotpasswordDto = <ForgotpasswordDto>{};

  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
  }


  public forgotPassword () {

      this.form.clientURI= 'http://localhost:4200/resetpassword';
    this.LoginService.forgotPassword('api/Login/ForgotPassword', this.form)
    .subscribe(_ => {
    console.log("SUCCESS");
    },
    err => {
     console.log("error");
    })
  }
}
