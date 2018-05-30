import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: TokenPayload = {
    username: '', 
    password: ''
  }

  constructor(private _authService: AuthenticationService, private _router: Router) {
  }

  login() {
    this._authService.login(this.credentials)
    .subscribe(() => {
      this._router.navigateByUrl('/home');
    }, (err) => console.error(err));
  }

  /*
  validateLogin() {
    console.log('login component validatelogin()...');
    
    // if (this.user.username && this.user.password) {
    //   this._loginService.validateLogin(this.user)
    //   .subscribe(
    //     res => {
    //       if (res.json().status === 'success') {
    //         localStorage.setItem('loggedInUser', this.user.username);
    //         this._router.navigate(['/home']);
    //       } else {
    //         alert('Wrong username password');
    //       }
    //     }, 
    //     err => console.log(err)
    //   );
    // } else {
    //   alert('Enter a username and password');
    // }
 
    if (this.user.username && this.user.password) {
      this._loginService.validateLogin(this.user)
      .then(res => {
          localStorage.setItem('loggedInUser', this.user.username);
          this._router.navigate(['/home']);
      })
      .catch(err => console.log(err));
    } else {
      alert('Enter a username and password');
    }    
  }
  */

}
