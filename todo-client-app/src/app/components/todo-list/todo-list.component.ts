import { IToDoItem, ToDoItemsState } from 'src/app/states/todo-items.state';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public expanded = false;
  public maxListLength = 5;
  @Select(ToDoItemsState.todoItems) todoItems$: Observable<IToDoItem[]>;
  constructor() { }
  
  ngOnInit() {
  }

}
