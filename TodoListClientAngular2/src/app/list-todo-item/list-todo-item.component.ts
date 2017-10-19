import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-todo-item',
  templateUrl: './list-todo-item.component.html',
  styleUrls: ['./list-todo-item.component.css']/*,
  changeDetection: ChangeDetectionStrategy.OnPush*/
})
export class ListTodoItemComponent implements OnInit {
  //@Input() list: TodoListWithItems;
  //@Input() clock: number;
  private idList : string;
  private list : TodoListWithItems;
  private sub: any;

  constructor(private todoListService: TodoListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idList = params['id']; // (+) converts string 'id' to a number
    });
    this.list = this.todoListService.getList( this.idList);
    //console.log("list: NAME " +  this.list.name);
  }

  getName(){
    //console.log("GET name():"+ this.list.name);
    return this.list.name;
  }
  getItems(){
     return this.list.items;
  }
  /*getItem(){
    return this.todoListService.getList(this.idList);
  }*/
  /*delete() {
    this.todoListService.SERVER_DELETE_LIST(this.list.id);
  }
  */
  createItem(label: string) {
    this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, false);
  }

  getColor(): string {
    console.log(this.list);
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  /*setColor(color: string) {
    console.log("setColor", color);
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      Object.assign({}, this.list.data, {color})
    );
  }*/
}
