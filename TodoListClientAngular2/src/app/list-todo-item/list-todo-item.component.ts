import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import { ActivatedRoute } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import {createEmptyStateSnapshot} from "@angular/router/src/router_state";
import {forEach} from "@angular/router/src/utils/collection";


import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {TodoItemComponent} from "../todo-item/todo-item.component";
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
  private draggedItem : any;

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
    let mot: string = (<HTMLInputElement>document.getElementById("rechercheFiltre")).value;
    let lignes: any;
    lignes = document.getElementsByClassName("trTableItemDetails");
    let i: number = 0;
    while (i < lignes.length) {
      lignes.item(i).className = "trTableItemDetails invisible";
      console.log(lignes.item(i).textContent);
      if (lignes.item(i).getElementsByClassName("columnText").item(0).textContent.indexOf(mot) !== -1) {
        lignes.item(i).className = "trTableItemDetails visible";
      }
      i++;
    }
  }

  createItem(label: string) {
    if(label){
      this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, null);
    }
    else{
      console.log("Label null");

    }
  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  drop($event) {
    const indexTarget: number = $event.target.parentNode.getElementsByClassName("columnNumber")[0].textContent - 1;
    const tabItems: any = this.list.items;
    let indexDrag: number = 0;
    while(tabItems[indexDrag].id !== this.draggedItem.id){
      indexDrag++;
    }

    let i: number = indexTarget;
    //On détruit les items après l'élément target
    while(i < tabItems.length){
      if(tabItems[i].id == this.draggedItem.id){
        indexDrag = i;
      }
      this.todoListService.SERVER_DELETE_ITEM(this.idList, tabItems[i].id);
      i++;
    }
    //Item dragged
    this.todoListService.SERVER_CREATE_ITEM(this.idList, this.draggedItem.label, this.draggedItem.checked, this.draggedItem.data);
    //Insérer les items après
    i = indexTarget;
    while(i<tabItems.length){
      if(i!=indexDrag){
        this.todoListService.SERVER_CREATE_ITEM(this.idList, tabItems[i].label, tabItems[i].checked, tabItems[i].data);
      }
      i++;
    }

    if(indexDrag < indexTarget){
      this.todoListService.SERVER_DELETE_ITEM(this.idList, tabItems[indexDrag].id);
    }
  }

  dragStart($event, item: TodoItemComponent) {
    this.draggedItem = item;
  }

  dragEnd($event) {
    this.draggedItem = null;
  }
}

