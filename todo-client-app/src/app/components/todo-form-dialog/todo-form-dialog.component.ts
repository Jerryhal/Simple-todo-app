import { filter, tap, finalize } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { IToDoItem, TodoItemSaved } from 'src/app/states/todo-items.state';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-form-dialog',
  templateUrl: './todo-form-dialog.component.html',
  styleUrls: ['./todo-form-dialog.component.css']
})
export class TodoFormDialogComponent implements OnInit {
  public model: IToDoItem;
  public saving: boolean = false;

  constructor(private store: Store, public dialogRef: MatDialogRef<TodoFormDialogComponent>) { }

  ngOnInit() {
    this.model = { title: '', description: '', id: null, done: false };
  }

  public save() {
    this.saving = true;
    this.store.dispatch(new TodoItemSaved(this.model)).pipe(
      filter(result => !!result),
      tap(() => this.dialogRef.close()),
      finalize(() => this.saving = false),
    ).subscribe();
  }

  public cancel() {
    this.dialogRef.close();
  }
}
