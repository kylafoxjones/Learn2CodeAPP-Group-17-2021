import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin resources/admin.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select/';
import {FormControl, Validators} from '@angular/forms';

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
  typecontrol = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  Admin:any = <any>{};

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
   this.getadmin();
    console.log(this.Admin);

    console.log(this.placeholder);
    // getting the object placeholder and its values from the course ts
    this.data.SubscriptionName = this.placeholder.subscriptionName;
    this.data.Duration = this.placeholder.duration;
    this.data.price = this.placeholder.price;
    this.data.Quantity = this.placeholder.subscriptionTutorSession[0].quantity;
    console.log("sss")
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
          this.data.AdminId = this.Admin.id;
          this.service.editSubscription(this.data).subscribe((result) => {
            this.data = result;
            this.dialogRef.close();
            Swal.fire('Update successful!', this.data.message, 'success');
          });
        }
      },(error) => {
        this.dialogRef.close();
        Swal.fire('Error!', error.error, 'error');
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
          this.data.AdminId = this.Admin.id;
          console.log(this.data)
          this.service.createSubscription(this.data).subscribe((result) => {
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
  refreshSubscriptionObj() {
    this.newSubscription = <any>{};
  }

  getSessionTypeList() {
    this.service.getSessionTypes().subscribe((result) => {
      this.typeList = result; //typelist list is populated
      console.log('session types from api', this.typeList);
    });
  }

  getadmin(){
    this.service.getAdminLoggedIn().subscribe((res)=> {
      this.Admin = res;
      this.data.AdminId = this.Admin.id;
      console.log(this.Admin);
      console.log(this.data.AdminId);
    });
  }

  selectType($event) {
    console.log('this is the event', $event);
    this.data.TutorSessionId = $event; //what is selected in the dropdown is sent back in this parameter to the api
    console.log(this.data.TutorSessionId);
    this.service.TutorSessionIdFromDropdown = this.data.TutorSessionId;
  }
}
