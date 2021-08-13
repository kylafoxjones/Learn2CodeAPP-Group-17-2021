import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  getRecievedMessagesForTutor(id){
    return this.http.get(this.apiUrl + 'GetRecievedMessages/' + id);
  }
  //#endregion
}
