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
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    NbLayoutModule,
    HttpClientModule,
    Ng2SearchPipeModule,
  ],
})
export class AdminModule {}
