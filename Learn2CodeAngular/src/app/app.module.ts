import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './Admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './Login/login.module';
import { ReportModule } from './Report/report.module';
import { StudentModule } from './Student/student.module';
import { TutorModule } from './Tutor/tutor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChartsModule } from 'ng2-charts';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Angular4PaystackModule } from 'angular4-paystack';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';


export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule ,
    // all seperate modules imported for the subsystems below
    AdminModule,
    LoginModule,
    ReportModule,
    StudentModule,
    ChartsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    TutorModule,
    Angular4PaystackModule.forRoot('pk_live_af05c857de047c4178a4ab3d32104299998199bb'),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: [],
        authScheme: 'Bearer ',
      },
    }),
    //  NgbModule,
  ],
  providers: [ MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
