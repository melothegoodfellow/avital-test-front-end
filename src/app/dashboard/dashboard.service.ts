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
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
  }

  getTodos(): Observable<any>{
    return this.http.get<any>(this.dashboardUrl, {
      headers: this.httpHeaders
    });
  }

  deleteTodo(todoId) {
    return this.http.delete<any>(this.dashboardUrl+"/"+todoId, this.httpHeaders);
  }

  editTodo(data: any) {
    return this.http.put<any>(this.dashboardUrl, data, this.httpHeaders);
  }
  
  completeTodo(todoId) {
    return this.http.patch<any>(this.dashboardUrl+"/"+todoId, this.httpHeaders);
  }
  
  saveTodo(description: string): Observable<any>{
    return this.http.post<any>(this.dashboardUrl, description, this.httpHeaders);
  }

}
