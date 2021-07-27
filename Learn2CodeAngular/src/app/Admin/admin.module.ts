import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UniversityComponent } from './university/university.component';
import { AddEditUniversityComponent } from './university/add-edit-university/add-edit-university.component';

@NgModule({
  declarations: [AdminComponent, UniversityComponent, AddEditUniversityComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
