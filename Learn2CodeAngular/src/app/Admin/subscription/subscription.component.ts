import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';
import { AddEditSubscriptionComponent } from './add-edit-subscription/add-edit-subscription.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {


  //pagination
  totalLength:any;
  page:number = 1;

  //declare variables
  subscriptionList: any = [];
  subscription: any;
  search;
  userID:any;
  Admin:any;

  constructor(
    public dialog: MatDialog,
    private service: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllSubscriptions();
    this.getAdminId();
    console.log(this.service.adminId);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete the subscription?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteSubscription(id).subscribe((result) => {
          this.getAllSubscriptions();
        });
        Swal.fire('Successful Deletion', '', 'success');
      }
      },(error) => {

        Swal.fire('Error!', error.error, 'error');
    });
  }

  openAddDialog() {
    this.service.edit = false;
    this.service.editId = 0;
    //fill a object place holder when add is clicked with nothing
    this.service.editSubscr = {};
    this.service.title = 'Create subscription';
    const dialogRef = this.dialog.open(AddEditSubscriptionComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllSubscriptions();
    });
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };


  openEditDialog(obj) {
    this.service.edit = true;
    //fill the object place holder when edit is clicked
    this.service.editSubscr = obj;
    console.log(this.service.editSubscription);

    this.service.subscriptions = this.subscriptionList;
    this.service.editId = obj.id;
    this.service.title = 'Edit subscription';
    const dialogRef = this.dialog.open(AddEditSubscriptionComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllSubscriptions();
    });
  }
  getAllSubscriptions() {
    this.service.getSubscriptions().subscribe((result) => {
      this.subscriptionList = result;
      this.totalLength = this.subscriptionList.length;
      console.log('all subscriptions from api', this.subscriptionList);
    });
  }

  getAdminId() {
  //  this.service.adminId = 2;
    //function on service using the api function

    this.userID = localStorage.getItem('id');
    console.log(this.userID);

    this.Admin = this.service.getAdminLoggedIn();
     console.log("admin user",this.Admin);
     this.service.adminId = this.Admin.id;
  }
}
