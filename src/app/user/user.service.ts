import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  constructor() { }

  setUser(user: User){
    this.user = user;
  }
}
