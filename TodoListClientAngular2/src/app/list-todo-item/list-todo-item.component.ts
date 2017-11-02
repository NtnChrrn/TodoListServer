import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import { ActivatedRoute } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';

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
  private edit    : boolean = false;

  constructor(private todoListService: TodoListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idList = params['id']; // (+) converts string 'id' to a number
    });
    this.list = this.todoListService.getList( this.idList);
    //console.log("list: NAME " +  this.list.name);
  }

  getName(){
    return this.list.name;
  }

  getItems(){
     return this.list.items;
  }

  getEdit(){
    return this.edit;
  }

  setEdit(){
    console.log("<<list-todo>> edit = " + !this.edit);
    this.edit = !this.edit;
  }

  createItem(label: string) {
    this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, true);
  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  deleteAll() {
    this.todoListService.SERVER_DELETE_ALL_ITEMS(this.list.id);
  }
}
