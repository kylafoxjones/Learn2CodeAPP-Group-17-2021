import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TutorService {
  apiUrl = 'https://localhost:44393/api/Tutor/';

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
  sessionContentCat:any;
  editSess: any;
  contents: any = [];
  updatedContent: any = {};
  oldContent: any;
  bookingIdToSend: any;
 // typeList: any = [];
 SessionTitle:any;


  constructor(private http: HttpClient) {}

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
//#group-session-content region
// getSessionContentCategory() {
//   return this.http.get(
//     this.apiUrl + 'GetSessionContentCategory'
//   );
// }
getSessionContentForInstance(id) { //get all content for an instance
  return this.http.get(this.apiUrl + 'GetSessionContent/' + id);
}

getAllTutorSessions(id){ //get specific tutor's sessions
  return this.http.get(this.apiUrl + 'GetTutorSessions/' + id);

}
posttFile(formdata): Observable<any>{ //create actual content
 
  return this.http.post(this.apiUrl+'CreateSessionContent',formdata);
}

getSessionContentType(){ //for dropdown options
  return this.http.get(
    this.apiUrl + 'GetSessionContentCategory');
}
deleteContent(id) {
  return this.http.delete(this.apiUrl + 'DeleteSessionContent/' + id);
}

editContent(formdata): Observable<any> {
  return this.http.put(this.apiUrl + 'EditSessionContent', formdata);
}

  //#endregion
}
