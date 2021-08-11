import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseContentComponent } from './add-course-content/add-course-content.component';
import { AdminService } from '../admin resources/admin.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {
  contentList: any;
  coursecat = this.service.courseContentCat;
  search;

  constructor(public dialog: MatDialog, private service: AdminService) {}

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
    });
  }

  getAllCourseContent() {
    this.service.getCourseContent().subscribe((result) => {
      this.contentList = result;
      console.log('list of content for category cosen', this.contentList);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseContentComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Course content file already exists. Please try again',
      //   confirmButtonText: 'Ok',
      // });
    });
  }
}
