import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { HOST_IP } from './service.constants';

export interface UserDetails {
  _id: string;
  username: string;
  exp: number;
  iat: number;
};

interface TokenResponse {
  token: string;
};

export interface TokenPayload {
  username: string;
  password: string;
};


@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private _http: HttpClient, private _router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  };

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  };

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) { 
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    /*
    if (method === 'post') {
      base = this._http.post(`/api/${type}`, user);
    } else {
      base = this._http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    */

    //console.log(`${HOST_IP}/api/${type}`)

    if (method === 'post') {
      base = this._http.post(`${HOST_IP}/api/${type}`, user);
    } else {
      base = this._http.get(`${HOST_IP}/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }   

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      }));

    return request;
  };

  public register(user: TokenPayload): Observable<any> {
    console.log('auth service register...');
    return this.request('post', 'register', user);
  };

  public login(user: TokenPayload): Observable<any> {
    console.log('auth.service login...')
    console.log(user);
    return this.request('post', 'login', user);
  };

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  };

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this._router.navigateByUrl('/');
  };
}
