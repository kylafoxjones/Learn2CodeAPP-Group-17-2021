import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';

@Component({
  selector: 'app-add-edit-course-content-category',
  templateUrl: './add-edit-course-content-category.component.html',
  styleUrls: ['./add-edit-course-content-category.component.scss'],
})
export class AddEditCourseContentCategoryComponent implements OnInit {
  degree: any;
  //instance of empty object
  newCourseContentCategory: any = <any>{};
  data: any = {};
  popupTitle = this.service.title;
  placeholder = this.service.oldCourseContentCategoryName;
  oldCourseContentCategory: any;
  oldDescription:any;
  oldPrice:any;
  placeHolderOrNo = this.service.edit;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditCourseContentCategoryComponent>,
    private service: AdminService
  ) {}

  ngOnInit() {
    this.oldCourseContentCategory = this.service.oldCourseContentCategoryName;
    this.oldDescription = this.service.oldCourseContentCategoryDescription;
    this.oldPrice = this.service.oldCourseContentCategoryPrice;
    
  }
  submitEdittedCourseContentCategory() {
    console.log('this is the id i got from the folder', this.service.courseFolderIdToSend);
    if (this.service.editId > 0) {
      Swal.fire({
        title: 'Are you sure you want to edit the course content category?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.editCourseContentCategory(this.data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Update successful!', this.data.message, 'success');
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to add a course content category?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.createCourseContentCategory(this.data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Saved!', this.data.message, 'success');
          });
        }
      });
    }
  }
  refreshDegreeObj() {
    this.newCourseContentCategory = <any>{};
  }
}
