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
import { AddEditMessagesComponent } from './messages/add-edit-messages/add-edit-messages.component';

@NgModule({
  declarations: [
    TutorComponent,
    ResourceCategoryComponent,
    AddEditResourceCategoryComponent,
    MaintainComponent,
    HomeComponent,
    MessagesComponent,
    AddEditMessagesComponent
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
