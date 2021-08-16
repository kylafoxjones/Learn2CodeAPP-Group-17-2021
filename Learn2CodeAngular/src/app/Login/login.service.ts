import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'https://localhost:44393/api/Login/';

  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  
  constructor(private http: HttpClient) { }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
  
  LoginUser(obj): Observable<any>{
    return this.http.post(this.apiUrl+'Login',obj);
  }
}
