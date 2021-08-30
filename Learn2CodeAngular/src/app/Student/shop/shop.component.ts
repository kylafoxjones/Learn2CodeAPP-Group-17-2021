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
  moduleList: any;
  moduleChosen: any;

  basketForStudentLoggedIn: any = {};
  courseBasketList: any = [];
  subscriptionBasketList: any = [];

  userId: any;
  thisStudent: any = {};

  reference: string = '';
  title: string;
  public showEmbed: boolean;
  // xx=this.service.PaymentStatus;
  token = '';
  total: any;
  checkoutDto: any = {};
  info: any;
  constructor(
    public dialog: MatDialog,
    private service: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.getLoggedInUser();
    this.getAllSubscriptions();
    this.getAllCourses();
    this.getModules();
  }

  getLoggedInUser() {
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.service.getStudent(this.userId).subscribe((res) => {
      this.thisStudent = res;
      console.log('student logged in ts file', this.thisStudent);
      this.service.studentId = this.thisStudent.id;
      console.log('student id kept in the service', this.service.studentId);
      this.getBasketForStudent();
    });
    //   console.log("student logged in ts file",this.thisStudent);
    //   this.service.studentId = this.thisStudent.id;
    //   console.log('student id kept in the service',this.service.studentId);
    //   this.getBasketForStudent();
  }
  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };
  getBasketForStudent() {
    //student ID hard coded for now
    let studentId = this.thisStudent.id;
    this.service.getBasket(studentId).subscribe((result) => {
      this.basketForStudentLoggedIn = result;
      console.log(
        'basket for student logged in',
        this.basketForStudentLoggedIn
      );
      this.getCourseBasket();
      this.getSubscriptionBasket();
      this.total = this.basketForStudentLoggedIn.totalPrice * 100;
    });
  }

  getCourseBasket() {
    this.service
      .getCourseBasket(this.basketForStudentLoggedIn.id)
      .subscribe((result) => {
        this.courseBasketList = result;
        console.log('course basket', this.courseBasketList);
      });
  }

  getSubscriptionBasket() {
    this.service
      .getSubscriptionBasket(this.basketForStudentLoggedIn.id)
      .subscribe((result) => {
        this.subscriptionBasketList = result;
        console.log('subscription basket', this.subscriptionBasketList);
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

  getModules() {
    // pick a module from the drop down in shoppp
    this.service.getModules().subscribe((result) => {
      this.moduleList = result;
      console.log('modules to pick from', this.moduleList);
    });
  }

  selectModule($event) {
    //get the module as input from user in dropdown
    this.moduleChosen = $event;
    console.log('module chosen', this.moduleChosen);
  }

  // Funx for adding subscription to basket
  addToSubscriptCart(newCartProduct: any) {
    let subscritionObjToSendToDB = {
      BasketId: this.basketForStudentLoggedIn.id,
      SubscriptionId: newCartProduct.id,
      ModuleId: this.moduleChosen,
    };
    console.log(
      'the dto sending through for subscription',
      subscritionObjToSendToDB
    );
    this.service
      .addToCartItems(subscritionObjToSendToDB)
      .subscribe((result) => {
        this.getBasketForStudent();
      });
  }

  // Funx for adding course to basket
  addToCourseCart(newCartProduct: any) {
    let courseObjToSendToDB = {
      BasketId: this.basketForStudentLoggedIn.id,
      CourseSubCategoryId: newCartProduct.id,
    };
    console.log('the dto sending through for course', courseObjToSendToDB);
    this.service
      .addToCourseCartItems(courseObjToSendToDB)
      .subscribe((result) => {
        this.getBasketForStudent();
      });
  }

  checkout() {
    //basketForStudentLoggedIn holds every item (both subscription + course)
    //basketForStudentLoggedIn.totalPrice has the overall price for checkout

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
    this.service
      .removeItemFromSubscriptionBasket(obj.id)
      .subscribe((result) => {
        this.getSubscriptionBasket();
        this.getBasketForStudent();
      });
  }

  removeItemFromCourseCart(obj) {
    this.service.removeItemFromCourseBasket(obj.id).subscribe((result) => {
      this.getCourseBasket();
      this.getBasketForStudent();
    });
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.title = 'Payment successfull';
    console.log(this.title, ref);
    if (ref.message === 'Approved') {
      //save to database
      this.checkoutDto.Message = 'Approved';
      this.checkoutDto.BasketId = this.basketForStudentLoggedIn.id;
      this.checkoutDto.StudentId = this.thisStudent.id;
      console.log('the dto to send to api', this.checkoutDto);
      this.service.checkout(this.checkoutDto).subscribe(
        (result) => {
          this.info = result;
          Swal.fire(
            'Checkout Complete!',
            this.info.message,
            'success'
          );
          this.getBasketForStudent();
        },
        (error) => {
          Swal.fire('Error!', error.error, 'error');
          this.getBasketForStudent();
        }
      );
    }
  }

  paymentCancel() {
    console.log('payment failed');
  }

  // paymentInit() {
  //   console.log('Payment initialized');
  //   // this.toggleEmbed();
  //   this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  //   console.log(this.reference);
  // }

  // paymentDone(ref: any) {
  //   this.title = 'Payment successfull';
  //   console.log(this.title, ref);
  //   console.log(ref.message);
  //  // this.service.PaymentStatus = ref.message;
  //   if (ref.message === 'Approved') {
  //     //save to database
  //     //basket emptied
  //     //products transfereed to your table
  //     //alert("payment done")
  //   //  this.service.PaymentStatus = ref.message;
  //     localStorage.setItem('dataSource', ref.message);
  //   //  console.log(this.service.PaymentStatus + 'hello');
  //   }
  //   //this.showEmbed= !this.showEmbed;

  //   //this.Refresh();
  // }

  // paymentCancel() {
  //   console.log('payment failed');
  //  // this.toggleEmbed();
  // //  this.service.getStatus();
  //   console.log(this.showEmbed);
  //   window.location.reload();
  //   //this.Refresh();
  // }
}
