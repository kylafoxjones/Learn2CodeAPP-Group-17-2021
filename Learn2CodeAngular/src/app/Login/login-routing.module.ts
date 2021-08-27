import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes =  [
  
  {
    path: '',
    component: LoginComponent,
    children: [
      // every child component of student needs routing here
      {
        path: 'login',
        component: LoginCompComponent,
      },
      {
        path: 'resetpassword',
        component: ResetPasswordComponent,
      },
   
    ],
  },
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
