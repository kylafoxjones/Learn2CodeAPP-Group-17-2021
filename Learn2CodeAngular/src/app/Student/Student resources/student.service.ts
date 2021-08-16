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

  addToCartItems(newProduct) {
    return this.http.post(this.apiUrl + 'AddSubscriptiontoBasket', newProduct);
  }

  addToCourseCartItems(newProduct) {
    return this.http.post(this.apiUrl + 'AddCoursetoBasket', newProduct);
  }

  getCourseTypes() {
    return this.http.get(this.apiUrl + 'GetCourseFolder');
  }
  getModules() {
    return this.http.get(this.apiUrl + 'GetModule');
  }

  getCoursesByID(id) {
    return this.http.get(this.apiUrl + 'GetCourseSybCategory/' + id);
  }

  getSubscriptions() {
    return this.http.get(this.apiUrl + 'GetSubscription');
  }

  getBasket(id){
    return this.http.get(this.apiUrl + 'GetBasket/' + id);
  }
  //#endregion
}
