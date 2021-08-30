import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = 'https://localhost:44393/api/Admin/';
  reportUrl = 'https://localhost:44393/api/Reporting/';
 

  //uni variables below
  editId = 0;
  editUni: any;
  unis: any = [];
  updatedUni: any = {};
  title: any;
  oldUniName: any;
  edit: boolean = true;
  universityIdToSend: any;

  //degree variables below
  editDeg: any;
  degrees: any = [];
  updatedDegree: any = {};
  oldDegreeName: any;
  degreeToSave: any = {};
  degreeIdToSend: any;

  //module variables below
  editMod: any;
  modules: any = [];
  updatedModule: any = {};
  oldModuleName: any;
  moduleToSave: any = {};

  //course variables
  editCrs: any;
  courses: any = [];
  updatedCourse: any = {};
  oldCourseName: any;
  courseToSave: any = {};
  adminId: any;

  //session content cat variables
  editSessionContentCat: any;
  sessionContentCategories: any = [];
  updatedSessionContentCategory: any = {};
  oldSessionContentCategoryName: any;
  sessionContentCategoryToSave: any = {};
  // admin id is used here too

  //course content cat variables
  editCourseContentCat: any;
  courseContentCategories: any = [];
  updatedCourseContentCategory: any = {};
  oldCourseContentCategoryName: any;
  oldCourseContentCategoryDescription: any;
  oldCourseContentCategoryPrice: any;
  courseContentCategoryToSave: any = {};
  courseFolderIdToSend: any;

  //#region subscription variables
  editSubscr: any;
  subscriptions: any = [];
  updatedSubscription: any = {};
  oldSubscription: any;
  subscriptionToSave: any = {};
  TutorSessionIdFromDropdown: any;
  //#endregion

  //#region tutor application variables
  application: any = {};
  applications: any[];
  tutorToSave: any;
  tutorToCreate: any = {};
  tutorToDelete: any = {};
  deleteTutorr: any = {};
  applicationList: any = [];
  //#endregion

  //#region course content variables
  courseContentCat:any;
  editCont: any;
  contents: any = [];
  updatedContent: any = {};
  oldContent: any;
  //ContentTypeIdFromDropdown: any;

  constructor(private http: HttpClient) {}
  //#region university
  getUniversities() {
    return this.http.get(this.apiUrl + 'GetAllUniversities');
  }

  createUniversity(obj) {
    console.log(obj);
    return this.http.post(this.apiUrl + 'CreateUniversity', obj);
  }

  deleteUniversity(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteUniversity/' + id);
  }

  editUniversity(newUniName) {
    var oldObj = this.unis.find((x) => x.id === this.editId);

    this.updatedUni = {
      Id: oldObj.id,
      UniversityName: newUniName.UniversityName,
    };
    return this.http.put(this.apiUrl + 'EditUniversity', this.updatedUni);
  }
  //#endregion

  //#region degree
  getDegrees(id: number) {
    return this.http.get(
      this.apiUrl + 'GetAllDegrees/' + this.universityIdToSend
    );
  }

  createDegree(obj) {
    console.log('im just the input name from html', obj);
    this.degreeToSave = {
      DegreeName: obj.DegreeName,
      UniversityId: this.universityIdToSend,
    };
    console.log(this.degreeToSave);
    return this.http.post(this.apiUrl + 'CreateDegree', this.degreeToSave);
  }

  deleteDegree(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteDegree/' + id);
  }

  editDegree(newDegreeName) {
    var oldObj = this.degrees.find((x) => x.id === this.editId);

    this.updatedDegree = {
      Id: oldObj.id,
      DegreeName: newDegreeName.DegreeName,
      UniversityId: this.universityIdToSend,
    };
    return this.http.put(this.apiUrl + 'EditDegree', this.updatedDegree);
  }
  //#endregion

  //#region Modules
  getModules(id: number) {
    return this.http.get(this.apiUrl + 'GetAllModules/' + this.degreeIdToSend);
  }

  createModule(obj) {
    console.log('im just the input name from html', obj);
    this.moduleToSave = {
      ModuleCode: obj.ModuleCode,
      DegreeId: this.degreeIdToSend,
    };
    console.log('this is what is sent to api', this.moduleToSave);
    return this.http.post(this.apiUrl + 'CreateModule', this.moduleToSave);
  }

  deleteModule(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteModule/' + id);
  }

  editModule(newModuleName) {
    var oldObj = this.modules.find((x) => x.id === this.editId);

    this.updatedModule = {
      Id: oldObj.id,
      ModuleCode: newModuleName.ModuleCode,
      DegreeId: this.degreeIdToSend,
    };
    console.log(this.updatedModule);
    return this.http.put(this.apiUrl + 'EditModule', this.updatedModule);
  }
  //#endregion

  //#region courses
  getCourses() {
    return this.http.get(this.apiUrl + 'GetAllCourseFolder');
  }

  createCourse(obj) {
    this.courseToSave = {
      AdminId: obj.AdminId,
      CourseFolderName: obj.CourseFolderName,
    };
    console.log(this.courseToSave);
    return this.http.post(
      this.apiUrl + 'CreateCourseFolder',
      this.courseToSave
    );
  }

  deleteCourse(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteCourseFolder/' + id);
  }

  editCourse(newCourseName) {
    var oldObj = this.courses.find((x) => x.id === this.editId);
    console.log(oldObj);
    this.updatedCourse = {
      Id: oldObj.id,
      AdminId:newCourseName.AdminId,
      CourseFolderName: newCourseName.CourseFolderName,
    };
    console.log(this.adminId);
    console.log(this.updatedCourse);
    return this.http.put(this.apiUrl + 'EditCourseFolder', this.updatedCourse);
  }
  //#endregion

  //#region course content category
  getCourseContentCategories() {
    return this.http.get(
      this.apiUrl + 'GetAllCourseSubCategory/' + this.courseFolderIdToSend
    );
  }

  createCourseContentCategory(obj) {
    this.courseContentCategoryToSave = {
      CourseFolderId: this.courseFolderIdToSend,
      CourseSubCategoryName: obj.CourseSubCategoryName,
      Description: obj.Description,
      price: obj.price,
    };
    console.log(this.courseContentCategoryToSave);
    return this.http.post(
      this.apiUrl + 'CreateCourseSubCategory',
      this.courseContentCategoryToSave
    );
  }

  deleteCourseContentCategory(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteCourseSubCategory/' + id);
  }

  editCourseContentCategory(newCourseContentCat) {
    var oldObj = this.courseContentCategories.find((x) => x.id === this.editId);
    console.log(oldObj); //extract from array where objects are based off the model which has courseFolder
    //what you get from api is based off the model
    this.updatedCourseContentCategory = {
      Id: oldObj.id,
      CourseFolderId: this.courseFolderIdToSend,
      CourseSubCategoryName: newCourseContentCat.CourseSubCategoryName,
      Description: newCourseContentCat.Description,
      price: newCourseContentCat.price,
    };
    console.log(this.updatedCourseContentCategory); //this is the dto
    //what you send is dtos, they are not based exactly on the models
    return this.http.put(
      this.apiUrl + 'EditCourseSubCategory',
      this.updatedCourseContentCategory
    );
  }
  //#endregion

  //#region session content category
  getSessionContentCategories() {
    return this.http.get(this.apiUrl + 'GetAllSessionContentCategory');
  }

  createSessionContentCategory(obj) {
    console.log(obj);
    this.sessionContentCategoryToSave = {
      AdminId: obj.AdminId,
      SessionContentCategoryName: obj.SessionContentCategoryName,
    };
    console.log(this.sessionContentCategoryToSave);
    return this.http.post(
      this.apiUrl + 'CreateSessionContentCategory',
      this.sessionContentCategoryToSave
    );
  }

  deleteSessionContentCategory(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteSessionContentCategory/' + id);
  }

  editSessionContentCategory(newSessionContentCategoryName) {
    var oldObj = this.sessionContentCategories.find(
      (x) => x.id === this.editId
    );
    console.log(oldObj);
    this.updatedSessionContentCategory = {
      Id: oldObj.id,
      AdminId: newSessionContentCategoryName.AdminId,
      SessionContentCategoryName:
        newSessionContentCategoryName.SessionContentCategoryName,
    };
    console.log(this.adminId);
    console.log(this.updatedSessionContentCategory);
    return this.http.put(
      this.apiUrl + 'EditSessionContentCategory',
      this.updatedSessionContentCategory
    );
  }
  //#endregion

  //#region students
  getStudents() {
    return this.http.get(this.apiUrl + 'GetAllStudents');
  }

  deleteStudent(id: string) {
    return this.http.delete(this.apiUrl + 'DeleteStudent/' + id);
  }
  //#endregion

  //#region Tutors
  getTutors() {
    return this.http.get(this.apiUrl + 'GetAllTutors');
  }
  deleteTutor(id: string) {
    return this.http.delete(this.apiUrl + 'DeleteTutor/' + id);
  }
  //#endregion

  //#region subscriptions
  getSubscriptions() {
    return this.http.get(this.apiUrl + 'GetAllSubscriptions');
  }

  createSubscription(obj) {
    this.subscriptionToSave = {
      AdminId: obj.AdminId,
      SubscriptionName: obj.SubscriptionName,
      Duration: obj.Duration,
      price: obj.price,
      Quantity: obj.Quantity,
      TutorSessionId: this.TutorSessionIdFromDropdown,
    };
    console.log(this.subscriptionToSave);
    return this.http.post(
      this.apiUrl + 'CreateSubscription',
      this.subscriptionToSave
    );
  }

  deleteSubscription(id: number) {
    return this.http.delete(this.apiUrl + 'DeleteSubscription/' + id);
  }

  editSubscription(newSubscription) {
    var oldObj = this.subscriptions.find((x) => x.id === this.editId);
    console.log(oldObj); //extract from array where objects are based off the model which has courseFolder
    //what you get from api is based off the model

    this.updatedSubscription = {
      Id: oldObj.id,
      AdminId: newSubscription.AdminId,
      SubscriptionName: newSubscription.SubscriptionName,
      Duration: newSubscription.Duration,
      price: newSubscription.price,
      Quantity: newSubscription.Quantity,
      TutorSessionId: this.TutorSessionIdFromDropdown,
    };
    console.log(this.updatedSubscription); //this is the dto
    //what you send is dtos, they are not based exactly on the models
    return this.http.put(
      this.apiUrl + 'EditSubscription',
      this.updatedSubscription
    );
  }

  getSessionTypes() {
    return this.http.get(this.apiUrl + 'GetAllTutorSessions');
  }
  //#endregion

  //#region tutor application

  getTutorApplications() {
    return this.http.get(this.apiUrl + 'GetAllAplications');
  }

  getTutorApplicationToLoad(id: number) {
    return this.http.get(this.apiUrl + 'GetTutorbyId/' + id);
  }
  rejectApp() {
    this.deleteTutorr = {
     Id: this.tutorToDelete.id,
      TutorName: this.tutorToDelete.tutorName,
      TutorSurname: this.tutorToDelete.tutorSurname,
      TutorCell: this.tutorToDelete.tutorCell,
      TutorAbout: this.tutorToDelete.tutorAbout,
      TutorPhoto: this.tutorToDelete.tutorPhoto,
      TutorEmail: this.tutorToDelete.tutorEmail,
      FileId: this.tutorToDelete.fileId,
      TutorStatusId: this.tutorToDelete.tutorStatusId,
   //   ModuleId:this.tutorToCreate.tutorModule
    };
    console.log('dto sent to api to reject', this.deleteTutorr);
    return this.http.put(this.apiUrl + 'RejectTutor', this.deleteTutorr);
  }

  createTutor(obj) {
    this.tutorToSave = {
      TutorName: this.application.tutorName,
      TutorSurname: this.application.tutorSurname,
      TutorCell: this.application.tutorCell,
      TutorAbout: this.application.tutorAbout,
      TutorPhoto: this.application.tutorPhoto,
      TutorEmail: this.application.tutorEmail,
      Id: this.application.id,
      UserName: obj.UserName,
      Password: obj.Password,
      TutorStatusId: this.application.tutorStatusId,
      FileId: this.application.fileId,
      ModuleId:this.application.tutorModule[0].moduleId,
      UserId: this.application.userId
    };
    console.log('object sending to api:', this.tutorToSave);
    return this.http.put(this.apiUrl + 'CreateTutor', this.tutorToSave);

  }
  // getAllTutorApplications() {
  //   this.getTutorApplications();
  // }

  //#endregion

  //#region payments
  postfile(obj): Observable<any> {
    return this.http.post(this.apiUrl + 'CSVUpload', obj, {
      responseType: 'text',
    });
  }

  getPayments() {
    return this.http.get(this.apiUrl + 'GetPayments');
  }
  //#endregion

  //#region course content
  getCourseContent() {
    return this.http.get(
      this.apiUrl + 'GetContent/' + this.courseContentCat.id
    );
  }


  posttFile(formdata): Observable<any>{

    return this.http.post(this.apiUrl+'CreatContent',formdata);
  }
  getCourseContentType(){
    return this.http.get(
      this.apiUrl + 'GetContenttype');
  }
  deleteContent(id) {
    return this.http.delete(this.apiUrl + 'DeleteContent/' + id);
  }

  editContent(formdata): Observable<any> {
    return this.http.put(this.apiUrl + 'EditContent', formdata);
}
  //#endregion

   //#region AdminHome
    getTotalStudents(){
      return this.http.get(this.reportUrl + 'TotalStudents');
    }

    getTotalTutors(){
      return this.http.get(this.reportUrl + 'TotalTutors');
    }


    getTotalUniversities(){
      return this.http.get(this.reportUrl + 'TotalUniversities');
    }

    getTotalDegrees(){
      return this.http.get(this.reportUrl + 'TotalDegrees');
    }

    getTotalModules(){
      return this.http.get(this.reportUrl + 'TotalDegrees');
    }

    getStudentUniGraphData():Observable<any>{
      return this.http.get(this.reportUrl + 'StudentsAtUniversity');
    }

    getCoursePieGraphData():Observable<any>{
      return this.http.get(this.reportUrl + 'CoursePieChart');
    }

  //#endregion

  getAdminLoggedIn(){
    return this.http.get(this.apiUrl + 'GetAdmin');
  }


  downloadCv(id) {
    console.log(id);
    return this.http.get(this.apiUrl + 'DownTutorApplication/' + id, {
      responseType: 'blob',
    });
  }
  

}
