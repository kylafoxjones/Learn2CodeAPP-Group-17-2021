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
    return this.http.get(this.apiUrl + 'GetAllDegrees/' +this.universityIdToSend);
  }

  createDegree(obj) {
    console.log('im just the input name from html',obj);
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
}
