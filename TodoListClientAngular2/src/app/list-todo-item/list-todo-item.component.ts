import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import { ActivatedRoute } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {createEmptyStateSnapshot} from "@angular/router/src/router_state";
import {forEach} from "@angular/router/src/utils/collection";

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-list-todo-item',
  templateUrl: './list-todo-item.component.html',
  styleUrls: ['./list-todo-item.component.css']/*,
  changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class ListTodoItemComponent implements OnInit {
  //@Input() list: TodoListWithItems;
  //@Input() clock: number;
  private idList  : string;
  private list    : TodoListWithItems;
  private sub     : any;

  constructor(private todoListService: TodoListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idList = params['id']; // (+) converts string 'id' to a number
    });
    this.list = this.todoListService.getList( this.idList);
  }

  getName(){
    return this.list.name;
  }

  getItems(){
     return this.list.items;
  }

  filtrerTache() {
    let mot: string;
    mot = (<HTMLInputElement>document.getElementById("rechercheFiltre")).value;
    let lignes: any;
    lignes = document.getElementsByClassName("trTableItemDetails");
    let i: number; i = 0;
    while (i < lignes.length) {
      lignes.item(i).className = "trTableItemDetails invisible";
      if (lignes.item(i).innerHTML.indexOf(mot) !== -1) {
        lignes.item(i).className = "trTableItemDetails visible";
      }
      i++;
    }
  }

  createItem(label: string) {
    this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, null);
  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }
}

