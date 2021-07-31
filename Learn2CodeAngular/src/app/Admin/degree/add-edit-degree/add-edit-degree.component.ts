import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';
@Component({
  selector: 'app-add-edit-degree',
  templateUrl: './add-edit-degree.component.html',
  styleUrls: ['./add-edit-degree.component.scss'],
})
export class AddEditDegreeComponent implements OnInit {
  degree: any;
  //instance of empty object
  newDegree: any = <any>{};
  data: any = {};
  popupTitle = this.service.title;
  placeholder = this.service.oldDegreeName;
  oldDegree: any;
  placeHolderOrNo = this.service.edit;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditDegreeComponent>,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    this.oldDegree = this.service.oldDegreeName;
  }

  submitEdittedDegree() {
    console.log(this.service.editDeg);
    if (this.service.editId > 0) {
      Swal.fire({
        title: 'Are you sure you want to edit the degree?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.editDegree(this.data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Update successful!', this.data.message, 'success');
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to add a degree?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.createDegree(this.data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Saved!', this.data.message, 'success');
          });
        }
      });
    }
  }
  refreshDegreeObj() {
    this.newDegree = <any>{};
  }
}
