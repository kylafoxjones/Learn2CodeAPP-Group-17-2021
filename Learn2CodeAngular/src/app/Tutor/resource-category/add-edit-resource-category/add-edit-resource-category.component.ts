import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { TutorService } from '../../tutor resources/tutor.service';

@Component({
  selector: 'app-add-edit-resource-category',
  templateUrl: './add-edit-resource-category.component.html',
  styleUrls: ['./add-edit-resource-category.component.scss'],
})
export class AddEditResourceCategoryComponent implements OnInit {
  category: any;
  //instance of empty object
  newCategory: any = <any>{};
  data: any = {};
  popupTitle = this.service.title;
  placeholder = this.service.editCat;
  oldCat: any;
  placeHolderOrNo = this.service.edit;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditResourceCategoryComponent>,
    private service: TutorService
  ) {}

  ngOnInit(): void {
    this.data.ResourceCategoryName = this.placeholder.resourceCategoryName;
    console.log(this.placeholder.resourceCategoryName);
  }

  submitEdittedCat() {
    console.log(this.service.editCat);
    if (this.service.editId > 0) {
      Swal.fire({
        title: 'Are you sure you want to edit the Resource Category?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.editResourceCategories(this.data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Update successful!', this.data.message, 'success');
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to add a Resource Category?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service
            .createResourceCategories(this.data)
            .subscribe((result) => {
              this.data = result;
              this.dialogRef.close();
              Swal.fire('Saved!', this.data.message, 'success');
            });
        }
      });
    }
  }
  refreshCategoryObj() {
    this.newCategory = <any>{};
  }
}
