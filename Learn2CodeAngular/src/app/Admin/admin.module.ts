import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UniversityComponent } from './university/university.component';
import { AddEditUniversityComponent } from './university/add-edit-university/add-edit-university.component';
import { DegreeComponent } from './degree/degree.component';
import { AddEditDegreeComponent } from './degree/add-edit-degree/add-edit-degree.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModuleComponent } from './module/module.component';
import { AddEditModuleComponent } from './module/add-edit-module/add-edit-module.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NbLayoutModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CourseComponent } from './course/course.component';
import { AddEditCourseComponent } from './course/add-edit-course/add-edit-course.component';
import { SessionContentCategoryComponent } from './session-content-category/session-content-category.component';
import { AddEditSessionContentCategoryComponent } from './session-content-category/add-edit-session-content-category/add-edit-session-content-category.component';
import { CourseContentCategoryComponent } from './course-content-category/course-content-category.component';
import { AddEditCourseContentCategoryComponent } from './course-content-category/add-edit-course-content-category/add-edit-course-content-category.component';
import { StudentComponent } from './student/student.component';
import { TutorComponent } from './tutor/tutor.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AddEditSubscriptionComponent } from './subscription/add-edit-subscription/add-edit-subscription.component';
import { MatSelectModule} from '@angular/material/select/';
import { TutorApplicationComponent } from './tutor-application/tutor-application.component';
import { AcceptRejectApplicationComponent } from './tutor-application/accept-reject-application/accept-reject-application.component';
import {MatCardModule} from '@angular/material/card';
import { CreateTutorComponent } from './tutor-application/create-tutor/create-tutor.component';
import { HomeComponent } from './home/home.component'; 
import { ChartsModule } from 'ng2-charts';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule} from '@angular/material/menu';
import { PaymentsComponent } from './payments/payments.component';
import { UploadCsvFileComponent } from './payments/upload-csv-file/upload-csv-file.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { AddCourseContentComponent } from './course-content/add-course-content/add-course-content.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AdminComponent,
    UniversityComponent,
    AddEditUniversityComponent,
    DegreeComponent,
    AddEditDegreeComponent,
    ModuleComponent,
    AddEditModuleComponent,
    CourseComponent,
    AddEditCourseComponent,
    SessionContentCategoryComponent,
    AddEditSessionContentCategoryComponent,
    CourseContentCategoryComponent,
    AddEditCourseContentCategoryComponent,
    StudentComponent,
    TutorComponent,
    SubscriptionComponent,
    AddEditSubscriptionComponent,
    TutorApplicationComponent,
    AcceptRejectApplicationComponent,
    CreateTutorComponent,
    HomeComponent,
    PaymentsComponent,
    UploadCsvFileComponent,
    CourseContentComponent,
    AddCourseContentComponent,
  
   
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AdminRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    NbLayoutModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    ChartsModule,
    NgxChartsModule,
    NgxPaginationModule
    
    
  ],
})
export class AdminModule {}
