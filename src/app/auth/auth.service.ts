import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin, UserSignUp } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = "http://localhost:3000";

  signUpUrl = this.baseURL+"/auth/signup";
  loginUrl = this.baseURL+"/auth/login";

  httpHeaders = {};

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/x-www-form-urlencoded"
    });
   }

  loginUser(userLogin: UserLogin): Observable<UserSignUp>{
    return this.http.post<UserSignUp>(this.loginUrl, userLogin, this.httpHeaders);
  }
  
  signUpUser(userForm: FormData): Observable<UserSignUp>{
    return this.http.post<UserSignUp>(this.signUpUrl, userForm, this.httpHeaders);
  }

}
