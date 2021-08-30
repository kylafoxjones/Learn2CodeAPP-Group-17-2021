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
  newCourseContentCategory: any = <any>{};
  data: any = {};
  popupTitle = this.service.title;
  // get the placeholder object below
  placeholder = this.service.editCourseContentCat;
  oldCourseContentCategory: any;
  oldDescription: any;
  oldPrice: any;
  placeHolderOrNo = this.service.edit;
  Admin:any;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditCourseContentCategoryComponent>,
    private service: AdminService
  ) {}

  ngOnInit() {
    console.log(this.placeholder);
    // getting the object placeholder and its values from the course ts
    this.data.CourseSubCategoryName = this.placeholder.courseSubCategoryName;
    this.data.Description = this.placeholder.description;
    this.data.price = this.placeholder.price;
    this.getadmin();
  }
  submitEdittedCourseContentCategory() {
    console.log(
      'this is the id i got from the folder',
      this.service.courseFolderIdToSend
    );
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
          this.data.AdminId = this.Admin.id;
          this.service
            .editCourseContentCategory(this.data)
            .subscribe((result) => {
              this.data = result;
              this.dialogRef.close();
              Swal.fire('Update successful!', this.data.message, 'success');
            },(error) => {
              this.dialogRef.close();
              Swal.fire('Error!', error.error, 'error');
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
          this.data.AdminId = this.Admin.id;
          this.service
            .createCourseContentCategory(this.data)
            .subscribe((result) => {
              this.data = result;
              this.dialogRef.close();
              Swal.fire('Saved!', this.data.message, 'success');
            },(error) => {
              this.dialogRef.close();
              Swal.fire('Error!', error.error, 'error');
            });
        }
      });
    }
  }
  refreshDegreeObj() {
    this.newCourseContentCategory = <any>{};
  }

  getadmin(){
    this.service.getAdminLoggedIn().subscribe((res)=> {
      this.Admin = res;
      this.data.AdminId = this.Admin.id;
      console.log(this.Admin);
      console.log(this.data.AdminId);
    });
  }
}
