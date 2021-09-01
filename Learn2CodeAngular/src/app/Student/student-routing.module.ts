import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentRecievedMessagesComponent } from './sent-recieved-messages/sent-recieved-messages.component';
import { ViewTutorsComponent } from './view-tutors/view-tutors.component';
import { StudentComponent } from './student.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { ShopComponent } from './shop/shop.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './student-home/profile/profile.component';
import { DisplayCoursesComponent } from './student-home/display-courses/display-courses.component';
import { ViewResourcesComponent } from './view-resources/view-resources.component';
import { ViewGroupSessionsComponent } from './view-group-sessions/view-group-sessions.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ViewSessionContentComponent } from './view-session-content/view-session-content.component';
import { SpecificSessionContentComponent } from './view-session-content/specific-session-content/specific-session-content.component';
import { ViewSubscriptionsComponent } from './view-subscriptions/view-subscriptions.component';
import {
  AuthGuard as AuthGuard
} from '../Login/auth.guard';
import { StudentGuard } from './student resources/guards/student.guard';
const routes: Routes =  [
  
  {
    path: '',
    component: StudentComponent,
    children: [
      // every child component of student needs routing here
      {
        path: 'registerstudent',
        component: RegisterComponent,
       
      },
      {
        path: 'viewgroupsessions',
        component: ViewGroupSessionsComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'studenthome',
        component: StudentHomeComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'studentSessions', 
        component: SessionsComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'viewtutors',
        component: ViewTutorsComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'studentmessages',
        component: SentRecievedMessagesComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'shop',
        component: ShopComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'specificcoursedisplay/:subCategoryId',
        component: DisplayCoursesComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'viewresource',
        component: ViewResourcesComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'viewsessioncontent',
        component: ViewSessionContentComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      {
        path: 'specificsessioncontent',
        component: SpecificSessionContentComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
      
      {
        path: 'viewresubscriptions',
        component: ViewSubscriptionsComponent,
        canActivate: [AuthGuard, StudentGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
