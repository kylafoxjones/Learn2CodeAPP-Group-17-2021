import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './Admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './Login/login.module';
import { ReportModule } from './Report/report.module';
import { StudentModule } from './Student/student.module';
import { TutorModule } from './Tutor/tutor.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // all seperate modules imported for the subsystems below
    AdminModule,
    LoginModule,
    ReportModule,
    StudentModule,
    TutorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
