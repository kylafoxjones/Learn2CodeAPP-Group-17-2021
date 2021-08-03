import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss'],
})
export class AddEditCourseComponent implements OnInit {
  course: any;
  //instance of empty object
  newCourse: any = <any>{};
  data: any = {};
  popupTitle = this.service.title;
    // get the placeholder object below
  placeholder = this.service.editCrs;
  oldCourse: any;
  placeHolderOrNo = this.service.edit;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditCourseComponent>,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    //this.oldCourse = this.service.oldCourseName;
    this.data.CourseFolderName=this.placeholder.courseFolderName;
    console.log(this.data.CourseFolderName);
  }

  submitEdittedCourse() {
    if (this.service.editId > 0) {
      console.log(this.service.editCrs);
      Swal.fire({
        title: 'Are you sure you want to edit the course?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.editCourse(this.data).subscribe((result) => {
            console.log(this.data);
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Update successful!', this.data.message, 'success');
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to add a course?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.createCourse(this.data).subscribe((result) => {
            console.log(this.data);
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Saved!', this.data.message, 'success');
          });
        }
      });
    }
  }
  refreshCourseObj() {
    this.newCourse = <any>{};
  }
}
