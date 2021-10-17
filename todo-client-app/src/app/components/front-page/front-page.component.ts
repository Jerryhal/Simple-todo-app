import { TodoFormDialogComponent } from './../todo-form-dialog/todo-form-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  public addTodoItem() {
    this.openTodoFormDialog();
  }

  private openTodoFormDialog() {
    return this.dialog.open(TodoFormDialogComponent, {
      width: '500px',
    }).afterClosed().subscribe();
  }
}
