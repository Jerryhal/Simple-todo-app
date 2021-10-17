import { CookieService } from 'ngx-cookie-service';
import { ResourceService } from 'src/app/services/resource-service/resource.service';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector } from '@ngxs/store';

export class TodoItemSaved {
    static readonly type = 'TodoItemSaved';
    constructor(public todoItem: IToDoItem) { }
}

export class SiteOpenedGetTodoItems {
    static readonly type = 'SiteOpenedGetTodoItems';
    constructor(public userId: string) { }
}

export class RemoveTodoItem {
    static readonly type = 'RemoveTodoItem';
    constructor(public id: string) { }
}

export class MarkTodoItemDone {
    static readonly type = 'MarkTodoItemDone';
    constructor(public id: string) { }
}

export interface IToDoItem {
    title: string;
    done: boolean;
    description: string;
    id: string;
}

export interface IToDoItemsState {
    todoItems: IToDoItem[];
}

@State<IToDoItemsState>({
    name: 'TodoItemsState',
    defaults: {
        todoItems: [],
    }
})
export class ToDoItemsState {
    constructor(private resourceService: ResourceService, private cookieService: CookieService) { }

    @Action(TodoItemSaved)
    public saveTodoItem(ctx: StateContext<IToDoItemsState>, action: TodoItemSaved) {
        const userId = this.cookieService.get('user-id');
        return this.resourceService.postTodoItem(action.todoItem, userId).pipe(
            mergeMap(() => this.getTodoItems(ctx, userId)),
        );
    }

    @Action(RemoveTodoItem)
    public removeTodoItem(ctx: StateContext<IToDoItemsState>, action: RemoveTodoItem) {
        const userId = this.cookieService.get('user-id');
        return this.resourceService.deleteTodoItem(action.id, userId).pipe(
            mergeMap(() => this.getTodoItems(ctx, userId)),
        );
    }

    @Action(MarkTodoItemDone)
    public markTodoItemDone(ctx: StateContext<IToDoItemsState>, action: MarkTodoItemDone) {
        const userId = this.cookieService.get('user-id');
        return this.resourceService.markTodoItemDone(action.id, userId).pipe(
            mergeMap(() => this.getTodoItems(ctx, userId)),
        );
    }

    @Action(SiteOpenedGetTodoItems)
    public siteOpenedGetTodoItems(ctx: StateContext<IToDoItemsState>, action: SiteOpenedGetTodoItems) {
        return this.getTodoItems(ctx, action.userId);
    }

    private getTodoItems(ctx: StateContext<IToDoItemsState>, user: string) {
        return this.resourceService.getTodoItems(user).pipe(
            filter(result => !!result),
            tap((result: IToDoItem[]) => {
                if (result) {
                    return ctx.setState({ todoItems: result });
                }
            }),
        );
    }

    @Selector()
    public static todoItems(state: IToDoItemsState) {
        return state.todoItems && state.todoItems.length > 0 ? state.todoItems : [];
    }
}