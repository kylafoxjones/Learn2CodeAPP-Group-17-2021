import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentRecievedMessagesComponent } from './sent-recieved-messages/sent-recieved-messages.component';
import { ViewTutorsComponent } from './view-tutors/view-tutors.component';
import { StudentComponent } from './student.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { ShopComponent } from './shop/shop.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes =  [
  
  {
    path: '',
    component: StudentComponent,
    children: [
      // every child component of student needs routing here
      {
        path: 'studenthome',
        component: StudentHomeComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
