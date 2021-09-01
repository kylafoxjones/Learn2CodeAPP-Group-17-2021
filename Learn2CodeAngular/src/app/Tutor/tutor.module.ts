import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorRoutingModule } from './tutor-routing.module';
import { TutorComponent } from './tutor.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ResourceCategoryComponent } from './resource-category/resource-category.component';
import { AddEditResourceCategoryComponent } from './resource-category/add-edit-resource-category/add-edit-resource-category.component';
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
import { MaintainComponent } from './maintain/maintain.component';
import { HomeComponent } from './home/home.component';

import { ChartsModule } from 'ng2-charts';
import { MessagesComponent } from './messages/messages.component';
import { CreateMessageComponent } from './messages/create-message/create-message.component';
import { SentRecievedMessagesComponent } from './sent-recieved-messages/sent-recieved-messages.component';
import { GroupSessionContentComponent } from './group-session-content/group-session-content.component';
import { AddGroupSessionContentComponent } from './group-session-content/add-group-session-content/add-group-session-content.component';
import { SpecificSessionComponent } from './group-session-content/specific-session/specific-session.component';
import { ResourceComponent } from './resource/resource.component';
import { AddEditResourceComponent } from './resource-category/add-edit-resource/add-edit-resource.component';
import { SpecificResourceComponent } from './resource-category/specific-resource/specific-resource.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { TakeAttendanceComponent } from './attendance/take-attendance/take-attendance.component';
import { MaintainTutorComponent } from './home/maintain-tutor/maintain-tutor.component';
import { ApplicationComponent } from './application/application.component';
import { SessionComponent } from './session/session.component';
import { CreateSessionComponent } from './session/create-session/create-session.component';
//import { SessionsComponent } from './sessions/sessions.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MaintainSessionComponent } from './session/maintain-session/maintain-session.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChangePasswordComponent } from './home/change-password/change-password.component';
import { FinalizeComponent } from './session/finalize/finalize.component';
//import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TutorComponent,
    ResourceCategoryComponent,
    AddEditResourceCategoryComponent,
    MaintainComponent,
    HomeComponent,
    MessagesComponent,
    CreateMessageComponent,
    SentRecievedMessagesComponent,
    GroupSessionContentComponent,
    AddGroupSessionContentComponent,
    SpecificSessionComponent,
    ResourceComponent,
    AddEditResourceComponent,
    SpecificResourceComponent,
    AttendanceComponent,
    TakeAttendanceComponent,
    MaintainTutorComponent,
    ApplicationComponent,
    SessionComponent,
    CreateSessionComponent,
    MaintainSessionComponent,
    ChangePasswordComponent,
    FinalizeComponent,
    //SessionsComponent,
    
 
  ],
  imports: [
    CommonModule,
    ChartsModule,
    TutorRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbTabsetModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class TutorModule { }
