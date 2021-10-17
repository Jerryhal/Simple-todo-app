import { RemoveTodoItem, MarkTodoItemDone } from 'src/app/states/todo-items.state';
import { Store } from '@ngxs/store';
import { Component, Input, OnInit } from '@angular/core';
import { IToDoItem } from 'src/app/states/todo-items.state';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  @Input() public model: IToDoItem;
  constructor(private store: Store) { }

  ngOnInit() {
  }

  public markAsDone() {
    this.store.dispatch(new MarkTodoItemDone(this.model.id))
  }

  public remove() {
    this.store.dispatch(new RemoveTodoItem(this.model.id))
  }
}
