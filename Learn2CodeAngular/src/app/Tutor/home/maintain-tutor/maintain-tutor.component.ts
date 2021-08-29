import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TutorService } from '../../tutor resources/tutor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintain-tutor',
  templateUrl: './maintain-tutor.component.html',
  styleUrls: ['./maintain-tutor.component.scss'],
})
export class MaintainTutorComponent implements OnInit {
  data = this.service.tutorToEdit;
  info: any;
  formdata = new FormData();
  photo:any;
  picture:any;
  // data:any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: TutorService,
    private dialogRef: MatDialogRef<MaintainTutorComponent>
  ) {}

  ngOnInit() {
    console.log('tutor we editing', this.data);
  }
  changePic(event) {
    console.log(event.target.files[0]);
    this.photo = event.target.files[0];
    console.log('the new pic', this.photo);
  }

  submitEditedTutor() {
    console.log('the new tutor details', this.data);
    this.formdata.append('id', this.data.id);
    this.formdata.append('tutorName', this.data.tutorName);
    this.formdata.append('tutorSurname', this.data.tutorSurname);
    this.formdata.append('tutorCell', this.data.tutorCell);
    this.formdata.append('tutorAbout', this.data.tutorAbout);
    this.formdata.append('tutorEmail', this.data.tutorEmail);
    this.formdata.append('userName', this.data.identity.userName);
    this.formdata.append('userId', this.data.userId);
    this.formdata.append('tutorPhoto', this.photo);
    this.formdata.append('file', this.data.file);
    this.formdata.append('fileId', this.data.fileId);

    console.log('the new details in FormBody', this.formdata);
    Swal.fire({
      title: 'Are you sure you want to edit your information?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.editTutor(this.formdata).subscribe(
          (result) => {
            this.info = result;
            Swal.fire(
              'Update to profile complete!',
              this.info.message,
              'success'
            );
          },
          (error) => {
            Swal.fire('Error!', error.error, 'error');
          }
        );
      }
    });
  }
}
