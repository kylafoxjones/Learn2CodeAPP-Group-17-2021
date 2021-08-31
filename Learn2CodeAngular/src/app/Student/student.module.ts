import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { ViewTutorsComponent } from './view-tutors/view-tutors.component';
import { SentRecievedMessagesComponent } from './sent-recieved-messages/sent-recieved-messages.component';
import { CreateMessageComponent } from './view-tutors/create-message/create-message.component';
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
import { StudentHomeComponent } from './student-home/student-home.component';
import {MatMenuModule} from '@angular/material/menu';
import { ShopComponent } from './shop/shop.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CreateFeedbackComponent } from './feedback/create-feedback/create-feedback.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './student-home/profile/profile.component';
import { MaintainStudentComponent } from './student-home/maintain-student/maintain-student.component';
import { DisplayCoursesComponent } from './student-home/display-courses/display-courses.component';
import { ViewResourcesComponent } from './view-resources/view-resources.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { ViewGroupSessionsComponent } from './view-group-sessions/view-group-sessions.component';
import { SessionsComponent } from './sessions/sessions.component';
import { CreateBookingComponent } from './sessions/create-booking/create-booking.component';
import { EditBookingComponent } from './sessions/edit-booking/edit-booking.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewSessionContentComponent } from './view-session-content/view-session-content.component';
import { SpecificSessionContentComponent } from './view-session-content/specific-session-content/specific-session-content.component';
import { ViewSubscriptionsComponent } from './view-subscriptions/view-subscriptions.component';
import { ChangeStudentPasswordComponent } from './student-home/change-student-password/change-student-password.component';


@NgModule({
  declarations: [
    StudentComponent,
    ViewTutorsComponent,
    SentRecievedMessagesComponent,
    CreateMessageComponent,
    StudentHomeComponent,
    ShopComponent,
    FeedbackComponent,
    CreateFeedbackComponent,
    RegisterComponent,
    ProfileComponent,
    MaintainStudentComponent,
    DisplayCoursesComponent,
    ViewResourcesComponent,
    ViewGroupSessionsComponent,
    SessionsComponent,
    ViewSessionContentComponent,
    SpecificSessionContentComponent,
    SessionsComponent,
    CreateBookingComponent,
    EditBookingComponent,
    SessionsComponent,
    ViewSubscriptionsComponent,
    ChangeStudentPasswordComponent
  ],
  imports: [
    Angular4PaystackModule.forRoot('pk_live_af05c857de047c4178a4ab3d32104299998199bb'),
    CommonModule,
    StudentRoutingModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbTabsetModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    ChartsModule,
    Ng2SearchPipeModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPaginationModule
  ]
})
export class StudentModule { }
