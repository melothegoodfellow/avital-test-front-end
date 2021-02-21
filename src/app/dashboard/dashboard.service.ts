import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorage } from '../library/local-storage';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseURL = "http://localhost:3000";

  dashboardUrl = this.baseURL+"/todo";
  httpHeaders = {};

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage
    ){
    
  }

  getTodos(): Observable<any>{
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.get<any>(this.dashboardUrl, {
      headers: this.httpHeaders
    });
  }

  deleteTodo(todoId) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.delete<any>(this.dashboardUrl+"/"+todoId, {
      headers: this.httpHeaders
    });
  }

  editTodo(data: any) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.put<any>(this.dashboardUrl, data, {
      headers: this.httpHeaders
    });
  }
  
  completeTodo(todoId) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.patch<any>(this.dashboardUrl+"/"+todoId, {}, {
      headers: this.httpHeaders
    });
  }
  
  saveTodo(description: string): Observable<any>{
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.post<any>(this.dashboardUrl, description, {
      headers: this.httpHeaders
    });
  }

}
