import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorRoutingModule } from './tutor-routing.module';
import { TutorComponent } from './tutor.component';


@NgModule({
  declarations: [
    TutorComponent
  ],
  imports: [
    CommonModule,
    TutorRoutingModule
  ]
})
export class TutorModule { }
