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
import { SessionComponent } from './session/session.component';

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
        },
        {
          path: 'students',
          component: MessagesComponent,
        },
        {
          path: 'resourcecategory',
          component: ResourceCategoryComponent,
        },
        {
          path: 'messages',
          component: SentRecievedMessagesComponent,
        },
        {
        path: 'attendance',
        component: AttendanceComponent,
        },
        {
          path: 'sessioncontent',
          component: GroupSessionContentComponent,
        },
        {
          path: 'specificsession',
          component: SpecificSessionComponent,
        },
        {
          path: 'specificresource',
          component: SpecificResourceComponent,
        },
      
      ],
    },
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule {}
