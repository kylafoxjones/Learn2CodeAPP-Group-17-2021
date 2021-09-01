import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { TutorService } from '../../tutor resources/tutor.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-group-session-content',
  templateUrl: './add-group-session-content.component.html',
  styleUrls: ['./add-group-session-content.component.scss'],
})
export class AddGroupSessionContentComponent implements OnInit {
  data: any;
  typeChosen: any;
  typeList: any = [];
  notes: any;
  recording: any;
  catxv: any;
  filecontent: any;
  reccontent: any;
  popupTitle = this.service.title;
  constructor(
    private service: TutorService,
    public dialog: MatDialog,
    private router: Router,
    private dialogRef: MatDialogRef<AddGroupSessionContentComponent>
  ) {}

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.service.getSessionContentType().subscribe((result) => {
      this.typeList = result;
      console.log('categories from the api: ', this.typeList);
    });
  }

  selectType($event) {
    console.log('this is the event', $event);
    this.typeChosen = $event;
    console.log(this.typeChosen);
  }

  SessionFile(event) {
    console.log(event.target.files[0]);
    this.notes = event.target.files[0];
    console.log(this.notes);
  }

  SessionVid(event) {
    console.log(event.target.files[0]);
    this.recording = event.target.files[0];
    console.log(this.recording);
  }

  public onSubmit() {
    console.log(this.typeChosen);
    if (this.service.editId == 0) {
      console.log(this.service.editId);
      Swal.fire({
        title: 'Are you sure you want to add the session content?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          let bookId = this.service.bookinginstance.id;
          console.log('book id is: ', bookId);
          let data = new FormData();
          console.log('cat id', this.typeChosen);
          data.append('sessionContentCategoryId', this.typeChosen);
          data.append('BookingInstanceId', bookId);
          data.append('Notes', this.notes);
          data.append('Recording', this.recording);
          this.service.posttFile(data).subscribe((res) => {
            this.service.hasContent = true;
            this.router.onSameUrlNavigation = 'reload';
            console.log(res);
            this.data = res;
            this.dialogRef.close();
            Swal.fire(
              'Session content has been uploaded!',
              this.data.message,
              'success'
            );
            //this.router.navigate(["/specificsession"]);
          },(error) => {

            Swal.fire('Error!', error.error, 'error');
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to edit the session content?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          let editIdd = this.service.editId;
          let bookId = this.service.bookinginstance.id;
          console.log(bookId);
          console.log(this.service.editId);
          console.log(editIdd);
          let formdata = new FormData();
          formdata.append('sessionContentCategoryId', this.typeChosen);
          formdata.append('BookingInstanceId', bookId);
          formdata.append('Notes', this.notes);
          formdata.append('Recording', this.recording);
          formdata.append('id', editIdd.toString());
          console.log('the data sent through for edit', formdata);
          this.service.editContent(formdata).subscribe((res) => {
            console.log(res);
            this.data = res;
            this.dialogRef.close();
            Swal.fire(
              'Session content has been updated!',
              this.data.message,
              'success'
            );
          },(error) => {

            Swal.fire('Error!', error.error, 'error');
          });
        }
      });
    }
  }
}
