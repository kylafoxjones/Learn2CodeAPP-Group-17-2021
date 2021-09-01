import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loginhomepage/login',
    pathMatch: 'full',
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'adminhomepage',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'tutorhomepage',
    loadChildren: () =>
      import('./tutor/tutor.module').then((m) => m.TutorModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'studenthomepage',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'loginhomepage',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    // canActivate: [AuthGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
