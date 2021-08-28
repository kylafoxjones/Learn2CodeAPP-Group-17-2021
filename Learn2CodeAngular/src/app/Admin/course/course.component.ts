import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';
import { NbAccordionItemHeaderComponent } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {

    //pagination
    totalLength:any;
    page:number = 1;

  //declare variables
  courseList: any = [];
  course: any;
  search;
  userID:any;
  Admin:any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: AdminService
  ) {}

  ngOnInit() {
    this.getAllCourses();
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

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
    },(error) => {
      Swal.fire('Error!', error.error, 'error');
    });
  }

  openAddDialog() {
    this.getAdminId();
    this.service.edit = false;
    this.service.editId = 0;
    //fill a object place holder when add is clicked with nothing
    this.service.editCrs = {};
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
    //fill the object place holder when edit is clicked
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
      this.totalLength = this.courseList.length;
    });
  }

  //function for creating adminId link
  getAdminId() {
   // this.service.adminId = 2;
   this.userID = localStorage.getItem('id');
   console.log(this.userID);
   
   this.Admin = this.service.getAdminLoggedIn();
    console.log("admin user",this.Admin);
    this.service.adminId = this.Admin.id;
  }
  
  navigateToCourseContentCategories(id: number) {
    this.service.courseFolderIdToSend = id;
    console.log(
      'this is the id of the folder',
      this.service.courseFolderIdToSend
    );
    this.router.navigateByUrl('/coursecontentcategory');
  }
}
