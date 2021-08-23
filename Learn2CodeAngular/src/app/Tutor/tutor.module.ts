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
//import { SessionsComponent } from './sessions/sessions.component';



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
    //SessionsComponent,
    
 
  ],
  imports: [
    CommonModule,
    ChartsModule,
    TutorRoutingModule,
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
    MatSidenavModule
  ]
})
export class TutorModule { }
