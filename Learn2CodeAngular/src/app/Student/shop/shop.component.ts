import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import Swal from 'sweetalert2';
import { StudentService } from '../Student resources/student.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  listOfCourses: any;
  listOfSubscriptions: any;
  search;

  constructor(
    public dialog: MatDialog,
    private service: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.getAllSubscriptions();
   this. getAllCourses();
  }

  getAllSubscriptions() {
    // all subscriptions to display in the shop
    this.service.getSubscriptions().subscribe((result) => {
      this.listOfSubscriptions = result;
      console.log('list of subscriptions for the shop',this.listOfSubscriptions);
    });
  }

  getAllCourses() {
    // all subscriptions to display in the shop
    this.service.getCourses().subscribe((result) => {
      this.listOfCourses = result;
      console.log('list of courses for the shop', this.listOfCourses);
    });
  }

  delete() {
    Swal.fire({
      title: 'Are you sure you want to checkout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '',
          'The product has been successfully removed from your cart',
          'success'
        );
      }
    });
  }

  // search() {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Unable to find',
  //     confirmButtonText: 'Ok',
  //   });
  // }
}
