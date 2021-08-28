import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseContentComponent } from './add-course-content/add-course-content.component';
import { AdminService } from '../admin resources/admin.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {

   //pagination
   totalLength:any;
   page:number = 1;

  contentList: any;
  coursecat = this.service.courseContentCat;
  search;
  content: any;

  constructor(public dialog: MatDialog, private service: AdminService, private router: Router) {}

  ngOnInit() {
    this.getAllCourseContent();
  }

  delete(id) {
    Swal.fire({
      title: 'Are you sure you want to delete the content',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteContent(id).subscribe((result) => {
         this.getAllCourseContent();

        });
        Swal.fire('Successful Deletion', '', 'success');
      }
    },(error) => {

      Swal.fire('Error!', error.error, 'error');
    });
  }
  getAllCourseContent() {
    this.service.getCourseContent().subscribe((result) => {
      this.contentList = result;
      this.totalLength = this.contentList.length;
      console.log('list of content for category chosen', this.contentList);
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  openEditDialog(obj) {
    this.service.edit = true;
    //fill the object place holder when edit is clicked
    this.service.editCont = obj;
    console.log(this.service.editCont);
    this.service.contents = this.contentList;
    this.service.editId = obj.id;
    this.service.title = 'Edit course content';
    const dialogRef = this.dialog.open(AddCourseContentComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCourseContent();
    });
  }

  openDialog() {
    this.service.edit = false;
    this.service.editId = 0;
    //fill a object place holder when add is clicked with nothing
    this.service.editCont = {};
    this.service.title = 'Create course content';
    const dialogRef = this.dialog.open(AddCourseContentComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCourseContent();
    });
  }
}
