import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TutorService } from '../../tutor resources/tutor.service';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.scss'],
})
export class FinalizeComponent implements OnInit {
  SessionWeFinalizing = this.service.sessionToFinalize;
  contentupload:boolean = this.SessionWeFinalizing.contentUploaded;
  attendance:boolean = this.SessionWeFinalizing.attendanceTaken;
  info: any = {};

  constructor(
    private service: TutorService,
    private dialogRef: MatDialogRef<FinalizeComponent>
  ) {}

  ngOnInit() {
    console.log('the session', this.SessionWeFinalizing);
    console.log('the sffffn', this.contentupload);
  }

  confirmFinalize() {
    Swal.fire({
      title: 'Are you sure you want to finalize the this session?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.FinalizeSession(this.SessionWeFinalizing.id).subscribe(
          (result) => {
            this.dialogRef.close();
            this.info = result;
            Swal.fire(
              'Finalization complete!',
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
