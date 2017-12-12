import { Component, OnInit } from '@angular/core';
import {TodoListWithItems, TodoListJSON, TodoListService, ItemJSON} from "../todo-list.service";
import {List} from "immutable";
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists = List<TodoListJSON>();

  constructor(private todoListService: TodoListService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
  }

  createList(name: string) {
    if(name){
      this.todoListService.SERVER_CREATE_NEW_LIST(name);
    } else {
      this.snackBar.open("Veuillez donner un nom à la liste.",  'Fermer', {
        duration: 50000,
      });
    }

  }

}
