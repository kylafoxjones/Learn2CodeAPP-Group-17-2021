import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  apiUrl = 'https://localhost:44393/api/Student/';
  apiUrlLogin = 'https://localhost:44393/api/Login/';
  //AdminapiUrl = 'https://localhost:44393/api/Admin/';
  //#region messaging
  title: any;
  tutorId: any;
  tutorObj: any = {};
  //#endregion
  student: any;
  // userId:any;
  // id:any;
  editId = 0;
  editStud: any;
  students: any = [];
  updatedStud: any = {};
  oldStudName: any;
  edit: boolean = true;
  moduleId: any;
  userId: any;
  studentId: any;
  courseObj: any = {};
  SessionTitle:any;
  // studentId:any;
  bookingInstanceID: any;
  bookinginstance:any={};
  studentIdBooking: any;
  bookingID: any;
  moduleID: any;
  bookingToEdit: any = {};

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

  checkout(dto) {
    return this.http.post(this.apiUrl + 'Checkout', dto);
  }
  //#endregion

  //#region feedback
  getSessions(StudentId) {
    return this.http.get(this.apiUrl + 'GetMyRegiseredSessions/' + StudentId);
  }

  createFeedbackForSession(feedback) {
    return this.http.post(this.apiUrl + 'CreateFeedback', feedback);
  }

  getMyFeedback(StudentId) {
    return this.http.get(this.apiUrl + 'GetMyFeedback/' + StudentId);
  }

  deleteFeedback(StudentId, BookingInstanceId) {
    return this.http.delete(
      this.apiUrl + 'DeleteMyFeedback/' + StudentId + '/' + BookingInstanceId
    );
  }
  //#endregion

  //#region register
  registerStudent(studentToRegister) {
    return this.http.post(this.apiUrl + 'Register', studentToRegister);
  }
  getUnis() {
    return this.http.get(this.apiUrl + 'GetUniRegister');
  }

  getUniDegrees(UniId) {
    return this.http.get(this.apiUrl + 'GetDegreeRegister/' + UniId);
  }

  getUniModules(degreeID) {
    return this.http.get(this.apiUrl + 'GetModuleRegister/' + degreeID);
  }
  //#endregion

  getStudent(id) {
    //needs userId
    return this.http.get(this.apiUrl + 'Getstudent/' + id);
  }

  getStudentCourses(id) {
    return this.http.get(this.apiUrl + 'GetStudentCourses/' + id);
  }
  getStudentInfo() {
    //to get the student info for the circle at the top
    this.userId = localStorage.getItem('id');
    console.log(this.userId);
    this.getStudent(this.userId).subscribe((result) => {
      this.student = result;
      console.log('student info', this.student);
    });
    return this.student;
  }
  editStudent(newStudName) {
    console.log(this.editStud);

    // var oldObj = this.students.find((x) => x.id === this.editId);
    // console.log(oldObj);

    this.updatedStud = {
      StudentId: this.editStud.id,
      StudentName: newStudName.StudentName,
      StudentSurname: newStudName.StudentSurname,
      StudentCell: newStudName.StudentCell,
      UserName: newStudName.UserName,
      Email: newStudName.Email,
      UserId: this.userId,
      ModuleId: this.moduleId,
    };
    return this.http.put(this.apiUrl + 'updatestudent', this.updatedStud);
  }

  deleteStudInfo(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteStudent/' + id);
  }

  getCourseById(id) {
    return this.http.get(this.apiUrl + 'Getcourseontent/' + id);
  }

  // getCourseContentVideoDisplay(id: number) {
  //   return this.http.get(this.apiUrl + 'Video/' + id, {
  //     responseType: 'blob',
  //   });
  // }

  getCourseContentVideoDisplay(id: number) {
    return this.http.get(this.apiUrl + 'Video/' + id, {
      responseType: 'blob',
    });
  }

  getCourseContentFileDisplay(id: number) {
    return this.http.get(this.apiUrl + 'DownloadRContentPdf/' + id, {
      responseType: 'blob',
    });
  }

  //#view resource region starts
  getModulesForResource() {
    return this.http.get(this.apiUrl + 'ViewModules');
  }

  getResourceByModule(id) {
    return this.http.get(this.apiUrl + 'ViewResources/' + id);
  }

  downloadResource(id: number) {
    return this.http.get(this.apiUrl + 'DownloadResource/' + id, {
      responseType: 'blob',
    });
  }
  //#end of region

  // getCourseContentFileDisplay(id: number) {
  //   return this.http.get(this.apiUrl + 'DownloadRContentPdf/' + id, {
  //     responseType: 'blob',
  //   });
  // }

  getGroupSessions(id) {
    return this.http.get(this.apiUrl + 'GetMyGroupSessions/' + id);
  }

  Getbookingindiv(id) {
    return this.http.get(this.apiUrl + 'GetbookingIndividual/' + id);
  }

  Available(module, type): Observable<any> {
    return this.http.get(
      this.apiUrl + 'GetIndividualAvailable/' + module + '/' + type
    );
  }

  makeBooking(obj) {
    return this.http.post(this.apiUrl + 'CreateIndividualBooking', obj);
  }

  getMyBookings(id) {
    return this.http.get(this.apiUrl + 'GetMyBookings/' + id);
  }

  editBooking(obj) {
    return this.http.post(this.apiUrl + 'BookingChangeRequest', obj);
  }

  deletePastBooking(id) {
    return this.http.get(this.apiUrl + 'CancelMyBooking/' + id);
  }
  getGroupSessionsContent(id) {
    return this.http.get(this.apiUrl + 'GetMyGroupSessionsContent/' + id);
  }

  getContentForSelectedSessions(id) {
    return this.http.get(this.apiUrl + 'GetMyGroupContent/' + id);
  }

  downloadContentFile(id: number) {
    return this.http.get(this.apiUrl + 'DownloadRContentPdfGroup/' + id, {
      responseType: 'blob',
    });
  }

  getContentVideoDisplay(id: number) {
    return this.http.get(this.apiUrl + 'VideoGroup/' + id, {
      responseType: 'blob',
    });
  }

  getBoughtSubscriptions(StudentId) {
    return this.http.get(this.apiUrl + 'GetMySubscriptions/' + StudentId);
  }
  
  changePassword(newPasswordInfo){
    return this.http.put(this.apiUrlLogin + 'ChangePassword', newPasswordInfo);
  }

}
