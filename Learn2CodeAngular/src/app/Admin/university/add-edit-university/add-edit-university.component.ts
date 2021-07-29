import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';
import { University } from '../../admin resources/university';

@Component({
  selector: 'app-add-edit-university',
  templateUrl: './add-edit-university.component.html',
  styleUrls: ['./add-edit-university.component.scss'],
})
export class AddEditUniversityComponent implements OnInit {
  university: any;
  //instance of empty object
  newUniversity: University = <University>{};

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditUniversityComponent>,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    this.refreshUniversityObj();
  }

  submitEdittedUni() {
    Swal.fire({
      title: 'Are you sure you want to add a university?',

      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.newUniversity);
        this.service.createUniversity(this.newUniversity);
        this.dialogRef.close();
        Swal.fire('Saved!', 'University has been updated.', 'success');
      }
    });
  }
  refreshUniversityObj() {
    this.newUniversity = <University>{};
  }
}
