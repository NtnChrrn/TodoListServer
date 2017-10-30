import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule }            from '@angular/forms';
import { NgModule }               from '@angular/core';
import { ColorPickerModule}         from 'primeng/primeng';
import { MenuModule, MenuItem}    from 'primeng/primeng';
import { CommonModule }           from '@angular/common';
import { AppComponent }           from './app.component';
import { TodoListComponent }      from './todo-list/todo-list.component';
import { TodoItemComponent }      from './todo-item/todo-item.component';
import { ListTodoItemComponent }  from './list-todo-item/list-todo-item.component';
import { TodoListService }        from "./todo-list.service";
import { HttpModule}              from '@angular/http';
import { RouterModule, Routes }   from '@angular/router';
import { ListsComponent }         from './lists/lists.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TriStateCheckboxModule} from 'primeng/primeng';

const appRoutes: Routes = [
  {
    path: 'lists',
    // canActivate: [AuthService],
    component: ListsComponent,
    data: { /*title: ''*/ }
  },
  {
    path: 'lists-detail/:id',
    // canActivate: [AuthService],
    component: ListTodoItemComponent,
    data: { /*title: ''*/ }
  }

];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    ListTodoItemComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, BrowserAnimationsModule,ColorPickerModule, TriStateCheckboxModule,
    RouterModule.forRoot(appRoutes, {useHash: true} )
  ],
  exports: [TriStateCheckboxModule],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
