import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';

@Component({
  selector: 'app-add-edit-university',
  templateUrl: './add-edit-university.component.html',
  styleUrls: ['./add-edit-university.component.scss'],
})
export class AddEditUniversityComponent implements OnInit {
  university: any;
  //instance of empty object
  newUniversity: any = <any>{};
  data: any = {};
  popupTitle = this.service.title;
  placeholder = this.service.editUni;
  oldUni: any;
  placeHolderOrNo = this.service.edit;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditUniversityComponent>,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    //  this.oldUni = this.service.oldUniName;
    this.data.UniversityName = this.placeholder.universityName;
    console.log(this.placeholder.universityName);
  }

  submitEdittedUni() {
    console.log(this.service.editUni);
    if (this.service.editId > 0) {
      Swal.fire({
        title: 'Are you sure you want to edit the university?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.editUniversity(this.data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Update successful!', this.data.message, 'success');
          },
          (error) => {
            this.dialogRef.close();
            Swal.fire('Error!', error.error, 'error');
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to add a university?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.createUniversity(this.data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Saved!', this.data.message, 'success');
          },
          (error) => {
            this.dialogRef.close();
            Swal.fire('Error!', error.error, 'error');
          });
        }
      });
    }
  }
  refreshUniversityObj() {
    this.newUniversity = <any>{};
  }
}
