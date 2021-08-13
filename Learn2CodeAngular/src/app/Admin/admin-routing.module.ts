import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CourseContentCategoryComponent } from './course-content-category/course-content-category.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { AddEditCourseComponent } from './course/add-edit-course/add-edit-course.component';
import { CourseComponent } from './course/course.component';
import { AddEditDegreeComponent } from './degree/add-edit-degree/add-edit-degree.component';
import { DegreeComponent } from './degree/degree.component';
import { HomeComponent } from './home/home.component';
import { AddEditModuleComponent } from './module/add-edit-module/add-edit-module.component';
import { ModuleComponent } from './module/module.component';
import { PaymentsComponent } from './payments/payments.component';
import { SessionContentCategoryComponent } from './session-content-category/session-content-category.component';
import { StudentComponent } from './student/student.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AcceptRejectApplicationComponent } from './tutor-application/accept-reject-application/accept-reject-application.component';
import { CreateTutorComponent } from './tutor-application/create-tutor/create-tutor.component';
import { TutorApplicationComponent } from './tutor-application/tutor-application.component';
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
        path: 'adminhome',
        component: HomeComponent,
      },
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
      {
        path: 'subscription',
        component: SubscriptionComponent,
      },
      {
        path: 'applications',
        component: TutorApplicationComponent,
      },
      {
        path: 'payments',
        component: PaymentsComponent,
      },
      {
        path: 'coursecontent',
        component: CourseContentComponent,
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
      },
      {
        path: 'acceptreject',
        component: AcceptRejectApplicationComponent,
      },
      {
        path: 'createtutor',
        component: CreateTutorComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
