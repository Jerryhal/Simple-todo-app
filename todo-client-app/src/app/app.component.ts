import { SiteOpenedGetTodoItems } from './states/todo-items.state';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo app';
  constructor(private cookieService: CookieService, private store: Store) {}

  public ngOnInit() {
    const userId = this.cookieService.get('user-id');
    if (userId && userId.length > 0) {
      this.store.dispatch(new SiteOpenedGetTodoItems(userId));
    } else {
      this.cookieService.set('user-id', this.getRandomUserId());
    }
  }

  private getRandomUserId(): string {
    return Math.random().toString(36).substr(2, 15);
  }
}
