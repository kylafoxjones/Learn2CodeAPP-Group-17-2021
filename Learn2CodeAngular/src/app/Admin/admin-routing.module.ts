import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CourseContentCategoryComponent } from './course-content-category/course-content-category.component';
import { AddEditCourseComponent } from './course/add-edit-course/add-edit-course.component';
import { CourseComponent } from './course/course.component';
import { AddEditDegreeComponent } from './degree/add-edit-degree/add-edit-degree.component';
import { DegreeComponent } from './degree/degree.component';
import { AddEditModuleComponent } from './module/add-edit-module/add-edit-module.component';
import { ModuleComponent } from './module/module.component';
import { SessionContentCategoryComponent } from './session-content-category/session-content-category.component';
import { StudentComponent } from './student/student.component';
import { TutorComponent } from './tutor/tutor.component';
import { AddEditUniversityComponent } from './university/add-edit-university/add-edit-university.component';
import { UniversityComponent } from './university/university.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // every child component of admin needs routing here
      {
        path: 'university',
        component: UniversityComponent,
      },
      {
        path: 'degree',
        component: DegreeComponent,
      },
      {
        path: 'module',
        component: ModuleComponent,
      },
      {
        path: 'course',
        component: CourseComponent,
      },
      {
        path: 'sessioncontentcategory',
        component: SessionContentCategoryComponent,
      },
      {
        path: 'coursecontentcategory',
        component: CourseContentCategoryComponent,
      },
      {
        path: 'student',
        component: StudentComponent,
      },
      {
        path: 'tutor',
        component: TutorComponent,
      },
      //I dont know if the addEdit path though stand alone or have soemthing before it e.g admin/univers
      {
        path: 'addEditUni',
        component: AddEditUniversityComponent,
      },
      {
        path: 'addEditDegree',
        component: AddEditDegreeComponent,
      },
      {
        path: 'addEditModule',
        component: AddEditModuleComponent,
      },
      {
        path: 'addEditCourse',
        component: AddEditCourseComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
