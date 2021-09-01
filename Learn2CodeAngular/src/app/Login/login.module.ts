import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginCompComponent } from './login-comp/login-comp.component';

import { NbLayoutModule, NbSidebarModule, NbTabsetModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginCompComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbTabsetModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    ChartsModule,
    Ng2SearchPipeModule
  ]
})
export class LoginModule { }
