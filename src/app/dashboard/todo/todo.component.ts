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
  // description: string = "";
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
      console.log(response);
     });
  }

  editTodo(data) {
    this.dashboardService.editTodo(data).subscribe(response => {
      console.log(response);
    });
  }
  
  deleteTodo(todoId) {
    this.dashboardService.deleteTodo(todoId).subscribe(response => {
      console.log(response);
    });
  }
  
  completeTodo(todoId) {
    this.dashboardService.completeTodo(todoId).subscribe(response => {
      console.log(response);
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
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
