import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UniversityComponent } from './university/university.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
     // { path: '', redirectTo: 'university' },
      {
        path: 'university',
        component: UniversityComponent,
      },
      // every child component of admin needs routing

      // {
      //   path: 'university',
      //   component: UniversityComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
