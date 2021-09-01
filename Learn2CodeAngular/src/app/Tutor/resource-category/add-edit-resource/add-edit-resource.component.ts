import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TutorService } from '../../tutor resources/tutor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-resource',
  templateUrl: './add-edit-resource.component.html',
  styleUrls: ['./add-edit-resource.component.scss'],
})
export class AddEditResourceComponent implements OnInit {
  data: any = {};
  popupTitle = this.service.title;
  typeList: any = [];

  constructor(
    private service: TutorService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditResourceComponent>
  ) {}

  ngOnInit() {
    this.getTypeList();
  }
  SessionFile(event) {
    //for file upload
    console.log(event.target.files[0]);
    this.service.notes = event.target.files[0];
    console.log(this.service.notes);
  }
  selectType($event) {
    //for selected dropdown value
    console.log('this is the event', $event);
    this.service.typeChosen = $event;
    console.log(this.service.typeChosen);
  }

  getTypeList() {
    this.service.getCategoryTypes().subscribe((result) => {
      this.typeList = result;
      console.log('types from api', this.typeList);
    });
  }

  onSubmit(){
   // console.log(this.service.editReso); //gets object that you want to edit
  // console.log(this.data.resourceDescription);
    if (this.service.editId > 0) {
      Swal.fire({
        title: 'Are you sure you want to edit the Resource?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          let editIdd = this.service.editId;
          let resource = this.service.specificList;
          console.log('resource: ', resource); //gives list of old ones
          let formdata = new FormData();
          console.log('resource cat id', this.service.typeChosen); //it gets this
          console.log(this.service.editId);
          console.log(editIdd);

          formdata.append('id', editIdd.toString());
          formdata.append('ResourceCategoryId', this.service.typeChosen);
          formdata.append('ModuleId', this.service.moduleIdToSend);
          formdata.append('ResoucesName', this.service.notes);
          formdata.append('ResourceDescription', this.data.resourceDescription);
          console.log(this.data.resourceDescription);
          console.log(formdata);
          this.service.editResources(formdata).subscribe((result) => {
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
        title: 'Are you sure you want to add a Resource?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          let resource=this.service.specificList;
          console.log("resource: ", resource);
            let data = new FormData();
      console.log('resource cat id',this.service.typeChosen); //it gets this
      data.append('ResourceCategoryId', this.service.typeChosen);
      data.append('ModuleId',this.service.moduleIdToSend );
      data.append('ResoucesName', this.service.notes);
      data.append('ResourceDescription',this.data.resourceDescription);
          this.service.createResources(data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire(
              'Resource has been uploaded!',
              this.data.message,
              'success'
            );
          });
        }
      });
    }
  }
}
