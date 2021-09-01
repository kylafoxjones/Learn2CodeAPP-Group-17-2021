import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../../../Login/login.service';
@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  
  constructor(private _authService: LoginService, private _router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this._authService.isUserStudent())
      return true;
    this._router.navigate(['/loginhomepage/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}
