import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tutor',
  templateUrl: './create-tutor.component.html',
  styleUrls: ['./create-tutor.component.scss'],
})
export class CreateTutorComponent implements OnInit {
  data: any = {};

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateTutorComponent>,
    private service: AdminService,
    private router: Router
  ) {}

  ngOnInit() {}

  submitCreateTutor() {
    this.service.createTutor(this.data).subscribe(
      (result) => {
        this.data = result;
        Swal.fire('Tutor created!', this.data.message, 'success').then((result) => {
          this.router.navigateByUrl('/applications').then((result) => {
            this.dialogRef.close();
            window.location.reload();
          });
        });
       
       
       
       // this.dialogRef.close();
      },
      (error) => {
        Swal.fire('Error!', error.error, 'error');
        this.dialogRef.close();
      }
    );
    this.dialogRef.close();
    // });
  }
  cancel(){
    this.dialogRef.close();
  }
}
