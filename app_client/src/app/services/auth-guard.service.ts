import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _auth: AuthenticationService, private _router: Router) { }

  canActivate() {
    if (!this._auth.isLoggedIn()) {
      window.alert("You don't have permission to view this page"); 
      this._router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
