import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//custom
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TodoComponent } from './dashboard/todo/todo.component';

const routes: Routes = [
  {
    path: "signup", component: SignupComponent
  },{
    path: "login", component: LoginComponent,
  },{
    path: "dashboard", component: TodoComponent
  },{
    //change to dashbaord
    path: "", redirectTo: "/login", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
