import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

import { UserSignUp } from "../../types/user";
import { LocalStorage } from 'src/app/library/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  userForm = new FormData();
  user: UserSignUp = {
    username:"",
    password:"",
    repassword:"",
    photo:"",
  };
  error = {
    message: ""
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorage
  ) { }

  ngOnInit(): void {
    // if(this.localStorage.getItem("user")){

    // }
  }

  onFileSelect(files: FileList) {
    if (files.length > 0) {
      this.userForm.append("photo", files[0]);
    }
  }

  signUpUser = function (user: UserSignUp){
    this.userForm.append("username", user.username);
    this.userForm.append("password", user.password);
    this.userForm.append("repassword", user.repassword);
    this.authService.signUpUser(this.userForm).subscribe(response => {
      const user = response.data;
      if(user){
        this.localStorage.deleteItem("user");
        this.localStorage.setItem("user", user);
        this.router.navigate(['/dashboard']);
      }
    }, errorResponse => {
      this.error = errorResponse.error;
      // this.userForm.forEach(function(val, key){
      //     this.userForm.delete(key);
      // });
      // const keys = this.userForm.keys();
      // for (var key of keys) {
      //   this.userForm.delete(key);
      // }
      // this.signUpForm = new FormData();
    });
  }

}
