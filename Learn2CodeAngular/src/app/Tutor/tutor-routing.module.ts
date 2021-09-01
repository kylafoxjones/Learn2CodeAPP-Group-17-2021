import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GroupSessionContentComponent } from './group-session-content/group-session-content.component';
import { SpecificSessionComponent } from './group-session-content/specific-session/specific-session.component';
import { HomeComponent } from './home/home.component';
import { MaintainComponent } from './maintain/maintain.component';
import { MessagesComponent } from './messages/messages.component';
import { ResourceCategoryComponent } from './resource-category/resource-category.component';
import { SpecificResourceComponent } from './resource-category/specific-resource/specific-resource.component';

import { SentRecievedMessagesComponent } from './sent-recieved-messages/sent-recieved-messages.component';
import { FinalizeComponent } from './session/finalize/finalize.component';
import { SessionComponent } from './session/session.component';
import {
  AuthGuard as AuthGuard
} from '../Login/auth.guard';
import { TutorGuard } from './tutor resources/guards/tutor.guard';
import { TutorComponent } from './tutor.component';

const routes: Routes = [
  
    {
      path: '',
      component: TutorComponent,
      children: [
        // every child component of student needs routing here
        {
          path: 'tutorhome',
          component: HomeComponent,
          canActivate: [AuthGuard, TutorGuard]
        },
        {
          path: 'maintain',
          component: MaintainComponent,

        },
        {
          path: 'application',
          component: ApplicationComponent,
          
        },
        {
          path: 'sessions',
          component: SessionComponent,
          canActivate: [AuthGuard, TutorGuard]
        },
        {
          path: 'students',
          component: MessagesComponent,
          canActivate: [AuthGuard, TutorGuard]
        },
        {
          path: 'resourcecategory',
          component: ResourceCategoryComponent,
          canActivate: [AuthGuard, TutorGuard]
        },
        {
          path: 'messages',
          component: SentRecievedMessagesComponent,
          canActivate: [AuthGuard, TutorGuard]
        },
        {
        path: 'attendance',
        component: AttendanceComponent,
        },
        {
          path: 'sessioncontent',
          component: GroupSessionContentComponent,
          canActivate: [AuthGuard, TutorGuard]
        },
        {
          path: 'specificsession',
          component: SpecificSessionComponent,
          canActivate: [AuthGuard, TutorGuard]
        },
        {
          path: 'specificresource',
          component: SpecificResourceComponent,
          canActivate: [AuthGuard, TutorGuard]
        },
        {
          path: 'finalize',
          component: FinalizeComponent,
        },
      
      ],
    },
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule {}
