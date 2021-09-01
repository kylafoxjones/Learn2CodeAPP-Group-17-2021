import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { AuthGuard } from '../Login/auth.guard';



import { AdminComponent } from './admin.component';
import {
  AuthGuard as AuthGuard
} from '../Login/auth.guard';
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
import { AdminGuard } from './admin resources/guards/admin.guard';
import { ReportHomeComponent } from '../Report/Home/report-home/report-home.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // every child component of admin needs routing here
      {
        path: 'adminhome',
        component: HomeComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'university',
        component: UniversityComponent,
         canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'degree',
        component: DegreeComponent,
         canActivate: [AuthGuard, AdminGuard]

      },
      {
        path: 'module',
        component: ModuleComponent,
        canActivate: [AuthGuard, AdminGuard]

      },
      {
        path: 'course',
        component: CourseComponent,
       canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'sessioncontentcategory',
        component: SessionContentCategoryComponent,
       canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'coursecontentcategory',
        component: CourseContentCategoryComponent,
      canActivate: [AuthGuard, AdminGuard]

      },
      {
        path: 'student',
        component: StudentComponent,
   canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'tutor',
        component: TutorComponent,
       canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'subscription',
        component: SubscriptionComponent,
     canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'applications',
        component: TutorApplicationComponent,
   canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [AuthGuard, AdminGuard]
    //    canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'coursecontent',
        component: CourseContentComponent,
        canActivate: [AuthGuard, AdminGuard]
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
        canActivate: [AuthGuard, AdminGuard]
      },
      {

        path: 'createtutor',
        component: CreateTutorComponent,
        canActivate: [AuthGuard, AdminGuard]

      },
      {
        path: 'report-home',
        component: ReportHomeComponent,
        canActivate: [AuthGuard, AdminGuard]

      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
