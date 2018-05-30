import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: UserDetails;

  constructor(private _authService: AuthenticationService, private _router: Router) { }

  ngOnInit() {
    this._authService.profile()
    .subscribe(user => {
      this.details = user;
    }, (err) => console.error(err));
  }

  goToHome() {
    this._router.navigateByUrl('/home');
  };
}
