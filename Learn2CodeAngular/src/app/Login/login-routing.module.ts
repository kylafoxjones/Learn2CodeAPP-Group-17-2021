import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

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
      
   
    ],
  },
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
