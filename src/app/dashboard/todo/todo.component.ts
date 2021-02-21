import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/library/local-storage';
import { Todo } from 'src/app/types/todo';
import { User } from 'src/app/types/user';
import { DashboardService } from '../dashboard.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {

  user: User;
  todos: Todo[] = [];
  pageSize: number = 5;
  page: number = 1;
  closeResult: string;
  photoUrl = "http://localhost:3000/photos/"
  todo: any = {
    id: "",
    description: "",
    is_complete: ""
  }

  constructor(
    private dashboardService: DashboardService,
    private localStorage: LocalStorage,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.user = this.localStorage.getItem("user");
    this.getTodos();
  }

  getTodos(){
    this.dashboardService.getTodos().subscribe(response => {
      this.todos = response.data;
     });
  }

  private getTodo(todoId){
    return this.todos.find((todo) => {
      return todo.id === todoId;
    })
  }

  saveTodo(data){
    this.dashboardService.saveTodo(data).subscribe(response => {
      this.getTodos();
     });
  }

  editTodo(data) {
    this.dashboardService.editTodo(data).subscribe(response => {
      this.getTodos();
    });
  }
  
  deleteTodo(todoId) {
    this.dashboardService.deleteTodo(todoId).subscribe(response => {
      this.getTodos();
    });
  }
  
  completeTodo(todoId) {
    this.dashboardService.completeTodo(todoId).subscribe(response => {
      this.getTodos();
    });
  }

  logout(){
    this.localStorage.deleteItem("user");
    this.router.navigate(['/login']);
  }

  openModal(content, todoId) {
    if(todoId){
      this.todo = this.getTodo(todoId);
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(this.todo.id !== ""){
        this.editTodo({
          description: this.todo.description,
          id: this.todo.id,
          user_id: this.user.id
        });
      }
      else{
        this.saveTodo({
          description: this.todo.description,
          user_id: this.user.id
        });
      }
    }, (reason) => {
    });
  }

}
