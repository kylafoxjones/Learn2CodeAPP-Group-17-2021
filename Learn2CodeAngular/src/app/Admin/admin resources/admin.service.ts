import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = 'https://localhost:44393/api/Admin/';
  editId = 0;
  editUni: any;
  unis: any = [];
  updatedUni: any = {};
  title: any;
  oldUniName:any;
  
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
}
