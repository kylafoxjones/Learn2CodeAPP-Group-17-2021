import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEditCourseContentCategoryComponent } from './add-edit-course-content-category/add-edit-course-content-category.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-course-content-category',
  templateUrl: './course-content-category.component.html',
  styleUrls: ['./course-content-category.component.scss'],
})
export class CourseContentCategoryComponent implements OnInit {

  //pagination
  totalLength:any;
  page:number = 1;

  //declare variables
  courseContentCategoryList: any = [];
  courseContentCategory: any;
  search;

  constructor(
    public dialog: MatDialog,
    private service: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllCourseContentCategories();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the course content category?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCourseContentCategory(id).subscribe((result) => {
          this.getAllCourseContentCategories();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    },(error) => {

      Swal.fire('Error!', error.error, 'error');
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  openAddDialog() {
    this.service.edit = false;
    this.service.editId = 0;
    //fill a object place holder when add is clicked with nothing
    this.service.editCourseContentCat = {};
    this.service.title = 'Create course content category';
    const dialogRef = this.dialog.open(AddEditCourseContentCategoryComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCourseContentCategories();
    });
  }

  openEditDialog(obj) {
    this.service.edit = true;
    //fill the object place holder when edit is clicked
    this.service.editCourseContentCat = obj;
    console.log(this.service.editCourseContentCat);
    this.service.oldCourseContentCategoryName = obj.courseContentCategoryName;
    this.service.oldCourseContentCategoryDescription = obj.Description;
    console.log(this.service.oldCourseContentCategoryDescription);
    this.service.oldCourseContentCategoryPrice = obj.price;
    this.service.courseContentCategories = this.courseContentCategoryList;
    this.service.editId = obj.id;
    this.service.title = 'Edit course content category';
    const dialogRef = this.dialog.open(AddEditCourseContentCategoryComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCourseContentCategories();
    });
  }
  getAllCourseContentCategories() {
    this.service.getCourseContentCategories().subscribe((result) => {
      this.courseContentCategoryList = result; //uni list is populated
      this.totalLength = this.courseContentCategoryList.length;
    });
  }

  goToContent(item) {
    this.service.courseContentCat = item;
    console.log('the cateory chosen', this.service.courseContentCat);
    this.router.navigateByUrl('/coursecontent');
  }
}
