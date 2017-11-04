import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() list: TodoListWithItems;
  @Input() clock: number;
  constructor(private todoListService: TodoListService) {

  }

  ngOnInit() {
  }

  delete() {
    this.todoListService.SERVER_DELETE_LIST(this.list.id);
  }

  getColor(): string {
    return this.list.data['color'] ? this.list.data['color'] : "#FFFFFF";
  }

  setColor(color: string) {
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      {color:color}
    );
  }
}
