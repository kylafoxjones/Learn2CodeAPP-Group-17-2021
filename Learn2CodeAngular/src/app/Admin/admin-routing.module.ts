import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DegreeComponent } from './degree/degree.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
