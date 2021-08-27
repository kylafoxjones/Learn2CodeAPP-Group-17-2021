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
      },
      {
        path: 'studenthome',
        component: StudentHomeComponent,
      },
      {
        path: 'studentSessions',
        component: SessionsComponent,
      },
      {
        path: 'viewtutors',
        component: ViewTutorsComponent,
      },
      {
        path: 'studentmessages',
        component: SentRecievedMessagesComponent,
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'specificcoursedisplay/:subCategoryId',
        component: DisplayCoursesComponent,
      },
      {
        path: 'viewresource',
        component: ViewResourcesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
