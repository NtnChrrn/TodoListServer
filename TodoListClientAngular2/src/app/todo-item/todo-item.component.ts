import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item:    ItemJSON;
  @Input() listId:  ListID;
  @Input() clock:   number;
  @Input() index:   number;
  @Input() edit:    boolean;

  private editingLabel = false;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges) { }

  setLabel(label: string) {
    if (label === "") {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
    }
    this.editLabel(false);
  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
  }

  editDeleteButton() {
    console.log("<<todo-item>> edit = " + this.edit);
    let styles = {
      'display': this.edit ? 'none' : 'block'
    }
    console.log(styles);
    return styles;
  }

  check(checked: any) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  delete() {
    this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
  }
}
