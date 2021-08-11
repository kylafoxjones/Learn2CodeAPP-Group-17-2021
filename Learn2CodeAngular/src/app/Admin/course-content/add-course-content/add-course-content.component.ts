import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin resources/admin.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-course-content',
  templateUrl: './add-course-content.component.html',
  styleUrls: ['./add-course-content.component.scss'],
})
export class AddCourseContentComponent implements OnInit {
  // types: Type[] = [
  //   { value: '1', viewValue: 'Notes' },
  //   { value: '2', viewValue: 'Video' },
  // ];
  data: any = {};
  typeChosen: any;

  typeList: any = [];
  newContent: any = <any>{};
  popupTitle = this.service.title;
  // get the placeholder object below
  placeholder = this.service.editCont;
  oldContent: any;
  

  constructor(
    private service: AdminService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddCourseContentComponent>
    ) {}

  ngOnInit() {
     this.getTypeList();
     console.log(this.typeList);
  
     //this.data.SubscriptionName = this.placeholder.subscriptionName;
     //this.data.Duration = this.placeholder.duration;
  }

    getTypeList() {
    this.service.getCourseContentType().subscribe((result) => {
      this.typeList = result;
      console.log('types from api', this.typeList);
    });
  }

  content(event) {
    let data = new FormData();
    data.append('courseSubCategoryId', this.service.courseContentCat.id);
    data.append('contentTypeId', this.typeChosen);
    data.append('content', event.target.files[0]);
    this.service.posttfile(data).subscribe((res) => {
      console.log(res);
    });
  }


  selectType($event) {
    console.log('this is the event', $event);
    this.typeChosen = $event; //what is selected in the dropdown is sent back in this parameter to the api
    console.log(this.typeChosen);
    this.typeChosen= this.service.typeChosenn;
  }

  submitEdittedCourseContent(event) {
    if (this.service.editId > 0) {
      let data = new FormData();
      data.append('courseSubCategoryId', this.service.courseContentCat.id);
      data.append('contentTypeId', this.typeChosen);
      data.append('content', event.target.files[0]);
      Swal.fire({
        title: 'Are you sure you want to edit the course content?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.editContent(data).subscribe((res) => {
            console.log(res);
          });



        //  this.service.editContent(this.data).subscribe((result) => {
          //  this.data = result;
             this.dialogRef.close();
           Swal.fire('Update successful!', this.data.message, 'success');
         // });
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to add course content?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.createSubscription(this.data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Saved!', this.data.message, 'success');
          });
        }
      });
    }
  }
}
