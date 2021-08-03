import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = 'https://localhost:44393/api/Admin/';
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
  //degreeId: any;

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
   oldCourseContentCategoryDescription:any;
   oldCourseContentCategoryPrice:any;
   courseContentCategoryToSave: any = {};
   courseFolderIdToSend: any;

  constructor(private http: HttpClient) {}

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

  getCourses() {
    return this.http.get(this.apiUrl + 'GetAllCourseFolder');
  }

  createCourse(obj) {
    this.courseToSave = {
      AdminId: this.adminId,
      CourseFolderName: obj.CourseName,
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
      AdminId: this.adminId,
      CourseFolderName: newCourseName.CourseName,
    };
    console.log(this.adminId);
    console.log(this.updatedCourse);
    return this.http.put(this.apiUrl + 'EditCourseFolder', this.updatedCourse);
  }

   
  getCourseContentCategories() {
    return this.http.get(this.apiUrl + 'GetAllCourseSubCategory/'+ this.courseFolderIdToSend);
  }

  createCourseContentCategory(obj) {
    this.courseContentCategoryToSave = {
      CourseFolderId:this.courseFolderIdToSend,
      CourseSubCategoryName: obj.CourseSubCategoryName,
      Description: obj.Description,
      price:obj.price,
      
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
      price:newCourseContentCat.price,
    };
    console.log(this.updatedCourseContentCategory); //this is the dto
    //what you send is dtos, they are not based exactly on the models
    return this.http.put(this.apiUrl + 'EditCourseSubCategory', this.updatedCourseContentCategory);
  }
  
  getSessionContentCategories() {
    return this.http.get(this.apiUrl + 'GetAllSessionContentCategory');
  }

  createSessionContentCategory(obj) {
    this.sessionContentCategoryToSave = {
      AdminId: this.adminId,
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
    var oldObj = this.sessionContentCategories.find((x) => x.id === this.editId);
    console.log(oldObj);
    this.updatedSessionContentCategory = {
      Id: oldObj.id,
      AdminId: this.adminId,
      SessionContentCategoryName: newSessionContentCategoryName.SessionContentCategoryName,
    };
    console.log(this.adminId);
    console.log(this.updatedSessionContentCategory);
    return this.http.put(this.apiUrl + 'EditSessionContentCategory', this.updatedSessionContentCategory);
  }

  getStudents() {
    return this.http.get(this.apiUrl + 'GeAllStudents');
  }
  deleteStudent(id:string) {
    return this.http.delete(this.apiUrl + 'DeleteStudent/' + id);
  }

  getTutors() {
    return this.http.get(this.apiUrl + 'GetAllTutors');
  }
  deleteTutor(id:string) {
    return this.http.delete(this.apiUrl + 'DeleteTutor/' + id);
  }
}
