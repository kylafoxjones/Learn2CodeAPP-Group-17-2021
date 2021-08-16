import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import Swal from 'sweetalert2';
import { StudentService } from '../Student resources/student.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  listOfCourseTypes: any;
  listOfSubscriptions: any;
  listOfCourses: any;
  typeChosen: any;
  search: string;

  subscriptionCartItems$: Observable<any[]> =
    this.service.GetSubscriptionCartItems;
  subscriptionCartItems: any[] = [];

  courseCartItems$: Observable<any[]> = this.service.GetCourseCartItems;
  courseCartItems: any[] = [];

  finalCartItems$: Observable<any[]> = this.service.GetFinalCart;
  finalCart: any[] = [];

  runningTotal$: Observable<any> = this.service.GetRunningTotal;
  runningTotal: any;

  constructor(
    public dialog: MatDialog,
    private service: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllSubscriptions();
    this.getAllCourses();

    this.subscriptionCartItems$.subscribe((res) => {
      this.subscriptionCartItems = res;
    });

    this.runningTotal$.subscribe((res) => {
      this.runningTotal = res;
    });

    this.courseCartItems$.subscribe((res) => {
      this.courseCartItems = res;
    });

    this.finalCartItems$.subscribe((res) => {
      this.finalCart = res;
    });
  }

  getAllSubscriptions() {
    // all subscriptions to display in the shop
    this.service.getSubscriptions().subscribe((result) => {
      this.listOfSubscriptions = result;
      console.log(
        'list of subscriptions for the shop',
        this.listOfSubscriptions
      );
    });
  }

  getAllCourses() {
    // all subscriptions to display in the shop
    this.service.getCourseTypes().subscribe((result) => {
      this.listOfCourseTypes = result;
      console.log(
        'list of course folders for the shop',
        this.listOfCourseTypes
      );
    });
  }

  selectType($event) {
    //get the course folder as input from user in dropdown
    this.typeChosen = $event;
    console.log('type chosen', this.typeChosen);
    //get the courses from the dbs
    this.service.getCoursesByID(this.typeChosen).subscribe((result) => {
      this.listOfCourses = result;
      console.log('list of courses for the chosen folder', this.listOfCourses);
    });
  }

  // Funx for adding items to the sub cart
  addToSubscriptCart(newCartProduct: any): void {
    //called in the html
    // takes in the item you picked as 'newCartProduct and sends it to the
    //addToCartItems function in the service
    this.service.addToCartItems(newCartProduct);
  }
  // Funx for adding items to the course cart
  addToCourseCart(newCartProduct: any): void {
    //called in the html
    // takes in the item you picked as 'newCartProduct and sends it to the
    //addToCourseCartItems function in the service
    this.service.addToCourseCartItems(newCartProduct);
  }

  checkout() {
    //final cart holds every item (both subscription + course)
    //running total has the overall price for checkout

    Swal.fire({
      title: 'Are you sure you want to checkout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        //intergrate paystack here
      }
    });
  }

  removeItemFromSubscriptionCart(obj) {
    let amountToRemove = obj.price;
    this.subscriptionCartItems.forEach((element, index) => {
      if (element == obj) {
        // remove item from cart
        this.subscriptionCartItems.splice(index, 1);
        console.log(
          'updated subscription cart list',
          this.subscriptionCartItems
        );
        // reduce running total
        this.runningTotal = this.runningTotal - amountToRemove;
        console.log('updated running total', this.runningTotal);
      }
    });
    //reduce final cart
    this.finalCart.forEach((element, index) => {
      if (element == obj) {
        this.finalCart.splice(index, 1);
        console.log('updated final cart list', this.finalCart);
      }
    });
  }

  removeItemFromCourseCart(obj) {
    let amountToRemove = obj.price;
    this.courseCartItems.forEach((element, index) => {
      if (element == obj) {
        // remove item from cart
        this.courseCartItems.splice(index, 1);
        console.log('updated course cart list', this.courseCartItems);
        // reduce running total
        this.runningTotal = this.runningTotal - amountToRemove;
        console.log('updated running total', this.runningTotal);
      }
    });
    //reduce final cart
    this.finalCart.forEach((element, index) => {
      if (element == obj) {
        this.finalCart.splice(index, 1);
        console.log('updated final cart list', this.finalCart);
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
