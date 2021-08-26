import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin resources/admin.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-course-content',
  templateUrl: './add-course-content.component.html',
  styleUrls: ['./add-course-content.component.scss'],
})
export class AddCourseContentComponent implements OnInit {
  data: any;
  typeChosen: any;
  typeList: any = [];
  popupTitle = this.service.title;
  oldContent: any;
  file:any;
   // get the placeholder object below
   placeholder = this.service.editCont;

  constructor(
    private service: AdminService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddCourseContentComponent>
    ) {}

  ngOnInit() {
     this.getTypeList();

    // this.data.ContentTypeId = this.placeholder.contentTypeId;
    // this.data.Content = this.placeholder.content;
  }

    getTypeList() {
    this.service.getCourseContentType().subscribe((result) => {
      this.typeList = result;
      console.log('types from api', this.typeList);
    });
  }

  public onSubmit() {
    console.log(this.typeChosen);
    if (this.service.editId==0){
      console.log(this.service.editId);
      Swal.fire({
        title: 'Are you sure you want to add the course content?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
    let data = new FormData();
    data.append('courseSubCategoryId', this.service.courseContentCat.id);
    data.append('contentTypeId',this.typeChosen );
    data.append('content', this.file);
    this.service.posttFile(data).subscribe((res) => {
      console.log(res);
      this.data = res;
      this.dialogRef.close();
      Swal.fire('Course content has been uploaded!', this.data.message, 'success');
    },(error) => {
      this.dialogRef.close();
      Swal.fire('Error!', error.error, 'error');
    });
  }
});
  }
  else{
    Swal.fire({
      title: 'Are you sure you want to edit the course content?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
    let editIdd= (this.service.editId);
      console.log(this.service.editId);
      console.log(editIdd);
    let formdata = new FormData();
    formdata.append('courseSubCategoryId', this.service.courseContentCat.id);
    formdata.append('contentTypeId',this.typeChosen );
    formdata.append('content', this.file);
    formdata.append('id',editIdd.toString());
    console.log('the data sent through for edit',formdata)
    this.service.editContent(formdata).subscribe((res) => {
       console.log(res);
      this.data = res;
       this.dialogRef.close();
       Swal.fire('Course content has been updated!', this.data.message, 'success');
          },(error) => {
            this.dialogRef.close();
            Swal.fire('Error!', error.error, 'error');
          });
        }
      });
  }
  }

  CourseContent(event) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
    console.log(this.file);
  }

  selectType($event) {
    console.log('this is the event', $event);
    this.typeChosen = $event;
    console.log(this.typeChosen);

  }
}



