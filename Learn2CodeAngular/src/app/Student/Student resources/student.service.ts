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

  studentId=3;
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

  getBasket(id) {
    return this.http.get(this.apiUrl + 'GetBasket/' + id);
  }

  getCourseBasket(BasketId) {
    return this.http.get(this.apiUrl + 'GetBasketCourses/' + BasketId);
  }

  getSubscriptionBasket(BasketId) {
    return this.http.get(this.apiUrl + 'GetBasketSubscriptions/' + BasketId);
  }

  removeItemFromCourseBasket(CourseBasketLineId) {
    return this.http.delete(this.apiUrl + 'RemoveCourse/' + CourseBasketLineId);
  }
  removeItemFromSubscriptionBasket(SubScriptionBasketLineId) {
    return this.http.delete(
      this.apiUrl + 'RemoveSubscription/' + SubScriptionBasketLineId
    );
  }
  //#endregion

  //#region feedback
  
  createFeedbackForSession(feedback) {
    return this.http.post(this.apiUrl + 'CreateFeedback', feedback);
  }

  getMyFeedback(StudentId){
    return this.http.get(this.apiUrl + 'GetMyFeedback/'+StudentId);
  }

  deleteFeedback(StudentId,BookingInstanceId){
    return this.http.delete(this.apiUrl + 'DeleteMyFeedback/' + StudentId +'/'+ BookingInstanceId);
  }
  //#endregion
}
