import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../admin resources/admin.service';
import { AddEditSubscriptionComponent } from './add-edit-subscription/add-edit-subscription.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
 //declare variables
 subscriptionList: any = [];
 subscription: any;
 search;
  constructor(
    public dialog: MatDialog,
    private service: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllSubscriptions();
    this.getAdminId();
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

  openEditDialog(obj) {
    this.service.edit = true;
    //fill the object place holder when edit is clicked
    this.service.editSubscription = obj;
    console.log(this.service.editSubscription);
    // this.service.oldSubscriptionName = obj.SubscriptionName;
    // this.service.oldSubscriptionDuration = obj.Duration;
    
    // this.service.oldSubscriptionPrice = obj.price;
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
    });
  }

  getAdminId(){
    this.service.adminId=1;
    //function on service using the api function 
    //in ngOnit calls serv
  }
}
