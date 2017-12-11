import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import {ConfirmationService} from 'primeng/primeng';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [ConfirmationService]
})
export class TodoListComponent implements OnInit {
  @Input() list: TodoListWithItems;
  @Input() clock: number;
  public color: string;

  constructor(private todoListService: TodoListService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.color = this.getColor();
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cette liste ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.todoListService.SERVER_DELETE_LIST(this.list.id);
      },

    });
  }

  getColor(): string {
    return this.list.data['color'] ? this.list.data['color'] : "#FFFFFF";
  }

  /* return number of items realised in the list */
  getNbChecked(): number {
    let nb = 0;
    for (const entry of this.list.items) {
      if (entry.checked === true) { nb++; }
    }
    return nb;
  }
  getPercentageOfRealised(): number {
    const nbCheck = this.getNbChecked();
    if (this.list.items.length !== 0 && nbCheck !== 0) { return nbCheck / this.list.items.length * 100; }
    return 0;
  }

  /* return number of items failed in the list */
  getNbFailed(): number {
    let nb = 0;
    for (const entry of this.list.items) {
      if (entry.checked === false) { nb++; }
    }
    return nb;
  }

  getPercentageOfFailed(): number {
    const nbFailed = this.getNbFailed();
    if (this.list.items.length !== 0 && nbFailed !== 0) { return nbFailed / this.list.items.length * 100; }
    return 0;
  }
  getPercentageOfUnrealised(): number{
    if (this.list.items.length>0) {
      return 100 - this.getPercentageOfFailed() - this.getPercentageOfRealised();
    }
    return 0;
  }

  setColor(colorPicked: string) {
    console.log(colorPicked);
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      {color: colorPicked}
    );
  }

  getColors(){
    return this.todoListService.getColors();
  }

  duplicateList(name, items) {
    const id = this.todoListService.SERVER_CREATE_NEW_LIST(name);
    for (const entry of items) {
      this.todoListService.SERVER_CREATE_ITEM(id.valueOf(), entry.label, entry.checked, entry.data);
    }
  }

}
