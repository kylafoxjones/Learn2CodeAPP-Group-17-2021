import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-module',
  templateUrl: './add-edit-module.component.html',
  styleUrls: ['./add-edit-module.component.scss'],
})
export class AddEditModuleComponent implements OnInit {
  module: any;
  //instance of empty object
  newModule: any = <any>{};
  data: any = {};
  popupTitle = this.service.title;
  placeholder = this.service.editMod;
  oldModule: any;
  placeHolderOrNo = this.service.edit;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditModuleComponent>,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    this.data.ModuleCode = this.placeholder.moduleCode;
  }

  submitEdittedModule() {
    if (this.service.editId > 0) {
      Swal.fire({
        title: 'Are you sure you want to edit the module?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.editModule(this.data).subscribe((result) => {
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
        title: 'Are you sure you want to add a module?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.createModule(this.data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Saved!', this.data.message, 'success');
          },(error) => {
            this.dialogRef.close();
            Swal.fire('Error!', error.error, 'error');
          });
        }
      });
    }
  }
  refreshModuleObj() {
    this.newModule = <any>{};
  }
}
