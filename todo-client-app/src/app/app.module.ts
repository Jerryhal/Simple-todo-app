import { ToDoItemsState } from 'src/app/states/todo-items.state';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodoFormDialogComponent } from './components/todo-form-dialog/todo-form-dialog.component';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    FrontPageComponent,
    NavbarComponent,
    TodoFormDialogComponent,
    TodoListItemComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
    NgxsModule.forRoot([ToDoItemsState])
  ],
  entryComponents: [TodoFormDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
