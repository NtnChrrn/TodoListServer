import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { FormsModule,
         ReactiveFormsModule }      from '@angular/forms';
import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { HttpModule}                from '@angular/http';
import { RouterModule, Routes }     from '@angular/router';
import { MenuModule,
         MenuItem,
         ColorPickerModule,
         TriStateCheckboxModule,
         CalendarModule,
         OverlayPanelModule,
         ConfirmDialogModule,
          DragDropModule,
        SidebarModule}
        from 'primeng/primeng';
import { AppComponent }             from './app.component';
import { TodoListComponent }        from './todo-list/todo-list.component';
import { TodoItemComponent }        from './todo-item/todo-item.component';
import { ListTodoItemComponent }    from './list-todo-item/list-todo-item.component';
import { TodoListService }          from "./todo-list.service";
import { ListsComponent }           from './lists/lists.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

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
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, HttpModule, BrowserAnimationsModule,ColorPickerModule,
    CalendarModule,
    OverlayPanelModule,
    TriStateCheckboxModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    DragDropModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    ConfirmDialogModule,
    SidebarModule,
  ],
  exports: [ConfirmDialogModule],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
