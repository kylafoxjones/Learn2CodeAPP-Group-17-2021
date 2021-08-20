import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordDto } from '../models/reset-password-dto.model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private _token: string;
  private _email: string;
  form: ResetPasswordDto = <ResetPasswordDto>{};

  constructor( private _route: ActivatedRoute, private LoginService : LoginService) { }

  ngOnInit(): void {
    this._token = this._route.snapshot.queryParams['token'];
    this._email = this._route.snapshot.queryParams['email'];
  }
  public resetPassword() {
  this.form.token=this._token;
  this.form.email=this._email;
  
    this.LoginService.resetPassword('api/Login/ResetPassword', this.form)
    .subscribe(_ => {
   console.log("success");
    },
    error => {
      console.log("error");
    })
  }
}
