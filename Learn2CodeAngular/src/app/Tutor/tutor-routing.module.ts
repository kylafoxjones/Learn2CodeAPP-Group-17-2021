import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MaintainComponent } from './maintain/maintain.component';
import { ResourceCategoryComponent } from './resource-category/resource-category.component';
import { TutorComponent } from './tutor.component';

const routes: Routes = [
  
    {
      path: '',
      component: TutorComponent,
      children: [
        // every child component of admin needs routing here
        {
          path: 'tutorhome',
          component: HomeComponent,
        },
        {
          path: 'maintain',
          component: MaintainComponent,
        },
     
        {
          path: 'resourcecategory',
          component: ResourceCategoryComponent,
        },
       
  
      ],
    },
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule {}
