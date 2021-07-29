import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = 'https://localhost:44393/api/Admin/';
  constructor(private http: HttpClient) {}

  //gets all unis
  getUniversities() {
    return this.http.get(this.apiUrl + 'GetAllUniversities');
    
  }
  // add a uni
    createUniversity(obj) {
    console.log(obj)
    return this.http.post(this.apiUrl + 'CreateUniversity',obj);
    
  }
}
