import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IToDoItem } from 'src/app/states/todo-items.state';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private baseUrl: string;
  private route: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://185.247.117.142:3000";
    this.route = "todo";
  }

  public getTodoItems(userId: string): Observable<IToDoItem[]> {
    return this.http.get<IToDoItem[]>(`${this.baseUrl}/api/${this.route}/items/${userId}`, { responseType: 'json' });
  }

  public postTodoItem(todo: IToDoItem, userId: string): Observable<any> {
    const body = { todo, userId }
    return this.http.post(`${this.baseUrl}/api/${this.route}/add`, body);
  }

  public markTodoItemDone(id: string, userId: string): Observable<any> {
    const body = { userId }
    return this.http.put(`${this.baseUrl}/api/${this.route}/done/${id}`, body);
  }

  public deleteTodoItem(id: string, userId: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { userId },
    };
    return this.http.delete(`${this.baseUrl}/api/${this.route}/delete/${id}`, options);
  }
}
