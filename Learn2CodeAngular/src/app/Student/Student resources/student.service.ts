import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl = 'https://localhost:44393/api/Student/';

//#region messaging
  title:any;
  tutorId: any;
  tutorObj: any = {};
//#endregion

  constructor(private http: HttpClient) { }
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
//#endregion
}
