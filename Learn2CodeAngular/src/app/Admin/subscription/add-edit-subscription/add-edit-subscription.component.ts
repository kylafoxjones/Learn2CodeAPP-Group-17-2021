import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';

@Component({
  selector: 'app-add-edit-subscription',
  templateUrl: './add-edit-subscription.component.html',
  styleUrls: ['./add-edit-subscription.component.scss']
})
export class AddEditSubscriptionComponent implements OnInit {
  subscription: any;
  //instance of empty object
  newSubscription: any = <any>{};
  data: any = {};
  popupTitle = this.service.title;
  
  // get the placeholder object below
  placeholder = this.service.editSubscription;
  oldSubscription: any;


  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditSubscriptionComponent>,
    private service: AdminService
  ) { }

  ngOnInit() {
    console.log(this.placeholder);
    // getting the object placeholder and its values from the course ts
    this.data.SubscriptionName = this.placeholder.subscriptionName;
    this.data.Duration = this.placeholder.duration;
    this.data.price = this.placeholder.price;
  }
  submitEdittedSubscription() {
   
    if (this.service.editId > 0) {
      Swal.fire({
        title: 'Are you sure you want to edit the subscription?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service
            .editSubscription(this.data)
            .subscribe((result) => {
              this.data = result;
              this.dialogRef.close();
              Swal.fire('Update successful!', this.data.message, 'success');
            });
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to add a subscription?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service
            .createSubscription(this.data)
            .subscribe((result) => {
              this.data = result;
              this.dialogRef.close();
              Swal.fire('Saved!', this.data.message, 'success');
            });
        }
      });
    }
  }
  refreshSubscriptionObj() {
    this.newSubscription = <any>{};
  }
}
