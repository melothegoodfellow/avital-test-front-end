import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/types/user';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router"
import { LocalStorage } from 'src/app/library/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  user: UserLogin = {
    username:"",
    password:""
  };

  constructor(
      private authService: AuthService,
      private router: Router,
      private localStorage: LocalStorage) { }

  ngOnInit(): void {
  }

  loginUser = function(user: UserLogin){
    this.authService.loginUser(user).subscribe(response => {
      const user = response.data;
      if(user){
        this.localStorage.deleteItem("user");
        this.localStorage.setItem("user", user);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
