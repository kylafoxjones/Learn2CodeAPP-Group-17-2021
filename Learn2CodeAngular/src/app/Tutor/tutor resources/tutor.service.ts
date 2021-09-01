import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TutorService {
  apiUrl = 'https://localhost:44393/api/Tutor/';
  apiUrlLogin = 'https://localhost:44393/api/Login/';

  //resource category variables below
  editId = 0;
  editCat: any;
  categories: any = [];
  updatedCat: any = {};
  title: any;
  oldCatName: any;
  edit: boolean = true;
  // universityIdToSend: any;

  //message variables below

  studentId: any;
  studentObj: any = {};

  //group session content variables
  sessionContentCat: any;
  editSess: any;
  contents: any = [];
  updatedContent: any = {};
  oldContent: any;
  bookingIdToSend: any;
  SessionTitle: any;
  content: any;
  bookinginstance: any;
  editCont: any;
  hasContent: any = false;

  //resource variables

  newResource: any;
  resources: any = [];
  updatedReso: any = {};
  oldResoName: any;
  resourceIdToSend: any;
  ResourceToSave: any = {};
  typeChosen: any;
  notes: any;
  moduleIdToSend: any;
  specificList: any = [];
  Resourcecontent: any = [];
  editResourceCat: any;
  moduleNameToSend: any;
  universityID: any;
  typeUniChosen: any;

  //#region
  sessionInstance: any;
  //#endregion

  tutorToEdit: any;

  tutorId: any;
  sessionToEdit:any ={};

  sessionToFinalize: any ={};
  constructor(private http: HttpClient) {}

  //#region resource cats
  getResourceCategories() {
    return this.http.get(this.apiUrl + 'GetAllResourceCategories');
  }

  createResourceCategories(obj) {
    console.log(obj);
    return this.http.post(this.apiUrl + 'CreateResourceCategory', obj);
  }

  deleteResourceCategories(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteResourceCategory/' + id);
  }

  editResourceCategories(newCatName) {
    var oldObj = this.categories.find((x) => x.id === this.editId);

    this.updatedCat = {
      Id: oldObj.id,
      ResourceCategoryName: newCatName.ResourceCategoryName,
    };
    return this.http.put(this.apiUrl + 'EditResourceCategory', this.updatedCat);
  }
  //#endregion

  //#region messages
  getStudents() {
    return this.http.get(this.apiUrl + 'GetAllStudents');
  }

  createMessages(obj) {
    return this.http.post(this.apiUrl + 'CreateMessage', obj);
  }

  deleteMessages(id) {
    return this.http.delete(this.apiUrl + 'DeleteMessage/' + id);
  }

  getSentMessagesForTutor(id) {
    return this.http.get(this.apiUrl + 'GetSentMessages/' + id);
  }
  getRecievedMessagesForTutor(id) {
    return this.http.get(this.apiUrl + 'GetRecievedMessages/' + id);
  }
  //#endregion
  //#group-session-content region
  // getSessionContentCategory() {
  //   return this.http.get(
  //     this.apiUrl + 'GetSessionContentCategory'
  //   );
  // }
  getSessionContentForInstance(id) {
    //get all content for an instance
    return this.http.get(this.apiUrl + 'GetSessionContent/' + id);
  }

  getAllTutorSessions(id) {
    //get specific tutor's sessions
    return this.http.get(this.apiUrl + 'GetTutorSessions/' + id);
  }
  posttFile(formdata): Observable<any> {
    //create actual content

    return this.http.post(this.apiUrl + 'CreateSessionContent', formdata);
  }

  getSessionContentType() {
    //for dropdown options
    return this.http.get(this.apiUrl + 'GetSessionContentCategory');
  }
  deleteContent(id) {
    return this.http.delete(this.apiUrl + 'DeleteSessionContent/' + id);
  }

  editContent(formdata): Observable<any> {
    return this.http.put(this.apiUrl + 'EditSessionContent', formdata);
  }

  getContentForSession(id) {
    return this.http.get(this.apiUrl + 'GetSessionContent/' + id);
  }

  getVideo(id) {
    return this.http.get(this.apiUrl + 'WatchVideo/' + id, {
      responseType: 'blob',
    });
  }

  getNotes(id) {
    return this.http.get(this.apiUrl + 'DownloadNotes/' + id, {
      responseType: 'blob',
    });
  }
  //#endregion

  //#region  resource
  getCategoryTypes() {
    return this.http.get(this.apiUrl + 'GetAllResourceCategories');
  }
  getModuleResources(id) {
    return this.http.get(this.apiUrl + 'GetModuleResources/' + id);
  }

  createResources(formdata): Observable<any> {
    return this.http.post(this.apiUrl + 'CreateResource', formdata);
  }
  editResources(data): Observable<any> {
    return this.http.put(this.apiUrl + 'EditResource', data);
  }

  deleteResources(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteResource/' + id); //needs ResourceId
  }
  getModules() {
    return this.http.get(this.apiUrl + 'GetAllModulesForResources');
  }
  getUnivForResources(id) {
    return this.http.get(this.apiUrl + 'GetUniversityForResources/' + id);
  }
  getUnis() {
    return this.http.get(this.apiUrl + 'GetAllUniversitiesForResources');
  }
  downloadResource(id) {
    return this.http.get(this.apiUrl + 'DownloadResource/' + id, {
      responseType: 'blob',
    });
  }
  //#end region

  getTutor(id) {
    //needs userId
    return this.http.get(this.apiUrl + 'GetTutor/' + id);
  }

  //#region attendance
  getAttendanceList(TutorId) {
    return this.http.get(this.apiUrl + 'GetSessions/' + TutorId);
  }

  getSessionList(BookingInstanceId) {
    return this.http.get(
      this.apiUrl + 'GetSessionAttendance/' + BookingInstanceId
    );
  }

  submitAttendance(list) {
    return this.http.post(this.apiUrl + 'SubmitAttendance', list);
  }

  deleteAttendance(BookingInstanceId) {
    return this.http.delete(
      this.apiUrl + 'DeleteAttendance/' + BookingInstanceId
    );
  }
  //#endregion

  editTutor(formdata): Observable<any> {
    return this.http.put(this.apiUrl + 'updateTutor', formdata);
  }

  applyToBecomeTutor(formdata): Observable<any> {
    console.log('the form data', formdata);
    return this.http.post(this.apiUrl + 'TutorApplication', formdata);
  }

  getApplicationModules() {
    //needs userId
    return this.http.get(this.apiUrl + 'GetAllModules');
  }

  getSessionTime() {
    return this.http.get(this.apiUrl + 'GetSessionTime');
  }

  getSessionType() {
    return this.http.get(this.apiUrl + 'GetsessionType');
  }

  getModule(tutorid) {
    return this.http.get(this.apiUrl + 'GetTutorModule/' + tutorid);
  }

  createSession(session) {
    return this.http.post(this.apiUrl + 'CreateBooking', session);
  }
  updateSession(session) {
    return this.http.put(this.apiUrl + 'EditSession', session);
  }
  deleteSession(SessionId){
    return this.http.delete(
      this.apiUrl + 'DeleteSession/' + SessionId
    );
  }

  getMyGroupSessions(TutorId){
    return this.http.get(this.apiUrl + 'GetGroupSessions/' + TutorId);
  }
  getMyIndivSessions(TutorId){
    return this.http.get(this.apiUrl + 'GetIndividualSessions/' + TutorId);
  }

  changePassword(newPasswordInfo){
    return this.http.put(this.apiUrlLogin + 'ChangePassword', newPasswordInfo);
  }

  FinalizeSession(BookingInstanceId){
    return this.http.get(this.apiUrl + 'FinalizeSession/' + BookingInstanceId);
  }

  deletetutor(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteTutor/' + id); 
  }
 
}
