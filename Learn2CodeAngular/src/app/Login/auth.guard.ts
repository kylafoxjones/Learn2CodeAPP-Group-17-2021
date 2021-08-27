import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private Service: LoginService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    if (this.Service.isUserAuthenticated()) {
      return true;
    }
    this._router.navigate(['/loginhomepage/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  }
  

