import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select/';

@Component({
  selector: 'app-add-edit-subscription',
  templateUrl: './add-edit-subscription.component.html',
  styleUrls: ['./add-edit-subscription.component.scss'],
})
export class AddEditSubscriptionComponent implements OnInit {
  subscription: any;
  typeList: any = [];
  typeName: any;
  //instance of empty object
  newSubscription: any = <any>{};
  data: any = {};
  popupTitle = this.service.title;

  // get the placeholder object below
  placeholder = this.service.editSubscr;
  oldSubscription: any;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditSubscriptionComponent>,
    private service: AdminService
  ) {}

  ngOnInit() {
    this.getSessionTypeList();

    console.log(this.placeholder);
    // getting the object placeholder and its values from the course ts
    this.data.SubscriptionName = this.placeholder.subscriptionName;
    this.data.Duration = this.placeholder.duration;
    this.data.price = this.placeholder.price;
    this.data.Quantity = this.placeholder.subscriptionTutorSession[0].quantity;
    //this.data.TutorSessionId= this.placeholder.tutorSessionId
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
          this.service.editSubscription(this.data).subscribe((result) => {
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
          this.service.createSubscription(this.data).subscribe((result) => {
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

  getSessionTypeList() {
    this.service.getSessionTypes().subscribe((result) => {
      this.typeList = result; //typelist list is populated
      console.log('session types from api', this.typeList);
    });
  }

  selectType($event) {
    console.log('this is the event', $event);
    this.data.TutorSessionId = $event; //what is selected in the dropdown is sent back in this parameter to the api
    console.log(this.data.TutorSessionId);
    this.service.TutorSessionIdFromDropdown = this.data.TutorSessionId;
  }
}
