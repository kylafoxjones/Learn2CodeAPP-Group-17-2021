import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';
import { NbAccordionItemHeaderComponent } from '@nebular/theme';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  //declare variables
  courseList: any = [];
  course: any;
  search;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: AdminService
  ) {}

  ngOnInit() {
    this.getAllCourses();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the Course?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCourse(id).subscribe((result) => {
          this.getAllCourses();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    });
  }

  openAddDialog() {
    this.getAdminId();
    this.service.edit = false;
    this.service.editId = 0;
    this.service.title = 'Create Course';
    const dialogRef = this.dialog.open(AddEditCourseComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCourses();
    });
  }

  openEditDialog(obj) {
    this.getAdminId();
    this.service.edit = true;
    this.service.editCrs = obj;
    console.log(this.service.editCrs);
    this.service.oldCourseName = obj.courseFolderName;
    this.service.courses = this.courseList;
    this.service.editId = obj.id;
    this.service.title = 'Edit University';
    const dialogRef = this.dialog.open(AddEditCourseComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCourses();
    });
  }

  getAllCourses() {
    this.service.getCourses().subscribe((result) => {
      this.courseList = result; //uni list is populated
    });
  }

  //function for creating adminId link
  getAdminId(){
    this.service.adminId=1;
  }
  navigateToCourseContentCategories(id:number){
    this.service.courseFolderIdToSend=id;
    console.log('this is the id of the folder',this.service.courseFolderIdToSend);
    this.router.navigateByUrl('/coursecontentcategory');
  }
}
