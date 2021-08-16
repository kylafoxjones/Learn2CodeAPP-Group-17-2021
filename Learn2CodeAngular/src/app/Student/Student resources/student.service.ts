import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  apiUrl = 'https://localhost:44393/api/Student/';

  //#region messaging
  title: any;
  tutorId: any;
  tutorObj: any = {};
  //#endregion

  constructor(private http: HttpClient) {}
  //#region messaging
  getTutorss() {
    return this.http.get(this.apiUrl + 'GetAllTutors');
  }

  createMessages(obj) {
    return this.http.post(this.apiUrl + 'CreateMessage', obj);
  }

  deleteMessages(id) {
    return this.http.delete(this.apiUrl + 'DeleteMessage/' + id);
  }

  getSentMessagesForStudent(id) {
    return this.http.get(this.apiUrl + 'GetSentMessages/' + id);
  }

  getRecievedMessagesForStudent(id) {
    return this.http.get(this.apiUrl + 'GetRecievedMessages/' + id);
  }
  //#endregion

  //#region shop
  // BEHAVIOUR SUBJECT for subscription cart
  private subscriptionCart = new BehaviorSubject<any>([]);
  //bs for course cart
  private courseCart = new BehaviorSubject<any>([]);
  // final cart = course cart + sub cart
  private finalCart = new BehaviorSubject<any>([]);
  //running total price
  private total = new BehaviorSubject(0);

  get GetSubscriptionCartItems(): Observable<any[]> {
    //this is what is subscribed to by other components
    return this.subscriptionCart.asObservable(); // it returns the BS as an observable
  }
  get GetCourseCartItems(): Observable<any[]> {
    //this is what is subscribed to by other components
    return this.courseCart.asObservable(); // it returns the BS as an observable
  }
  get GetFinalCart(): Observable<any[]> {
    //this is what is subscribed to by other components
    return this.finalCart.asObservable(); // it returns the BS as an observable
  }

  get GetRunningTotal(): Observable<any> {
    //this is what is subscribed to by other components
    return this.total.asObservable(); // it returns the BS as an observable
  }

  addToCartItems(newProduct: any): void {
    // add SUBSCRIPTIONS items to cart funx (use array restructoring)
    let subCart = [...this.subscriptionCart.getValue(), newProduct]; // get the value of the cart and add the new item to it
    this.subscriptionCart.next(subCart); //replace the BS with the latest value i.e subCart
    console.log('array of subscription cart items', subCart);

    let final = [...this.finalCart.getValue(), newProduct]; // get the value of the cart and add the new item to it
    this.finalCart.next(final); //replace the BS with the latest value i.e final
    console.log('array of final cart items', final);

    let amount = this.total.getValue() + newProduct.price;
    this.total.next(amount); //replace the BS with the latest value i.e amount
    console.log('running total of items in cart', amount);
  }

  addToCourseCartItems(newProduct: any): void {
    // add SUBSCRIPTIONS items to cart funx (use array restructoring)
    let courseCart = [...this.courseCart.getValue(), newProduct]; // get the value of the cart and add the new item to it
    this.courseCart.next(courseCart); //replace the BS with the latest value i.e courseCart
    console.log('array of course cart items', courseCart);

    let final = [...this.finalCart.getValue(), newProduct]; // get the value of the cart and add the new item to it
    this.finalCart.next(final); //replace the BS with the latest value i.e final
    console.log('array of final cart items', final);

    let amount = this.total.getValue() + newProduct.price;
    this.total.next(amount); //replace the BS with the latest value i.e amount
    console.log('running total of items in cart', amount);
  }

  getCourseTypes() {
    return this.http.get(this.apiUrl + 'GetCourseFolder');
  }

  getCoursesByID(id) {
    return this.http.get(this.apiUrl + 'GetCourseSybCategory/' + id);
  }

  getSubscriptions() {
    return this.http.get(this.apiUrl + 'GetSubscription');
  }
  //#endregion
}
