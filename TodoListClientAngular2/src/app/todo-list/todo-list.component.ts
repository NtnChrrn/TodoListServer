import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import {ConfirmationService} from 'primeng/primeng';
import {MatSnackBar} from '@angular/material';


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
  private editingLabel    = false;
  public display: boolean = false;

  constructor(private todoListService: TodoListService,
              private confirmationService: ConfirmationService,
              public snackBar: MatSnackBar) {}

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
    if (this.list.items.length !== 0 && nbCheck !== 0) { return ((nbCheck / this.list.items.length * 100)); }
    return 0;
  }

  getPercentageOfRealisedFixed(): number {
    const total = +this.getPercentageOfUnrealised().toFixed(1)
      + +this.getPercentageOfFailed().toFixed(1)
      + +this.getPercentageOfRealised().toFixed(1);
    if (total > 100) { return +this.getPercentageOfRealised().toFixed(1) - 0.1;
    }else { return +this.getPercentageOfRealised().toFixed(1); }
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

  setName(newName: string) {
    const oldName = this.list.name;
    console.log(oldName);
    this.todoListService.SERVER_UPDATE_NAME_LIST(this.list.id, newName);
    // Information
    this.snackBar.open("Nom de la liste enregistré",  'annuler', {
      duration: 20000,
    }).onAction().subscribe(() => {
      this.todoListService.SERVER_UPDATE_NAME_LIST(this.list.id, oldName);
    });
  }


  changeEditLabel(){
    this.editingLabel = !this.editingLabel;
  }

  changeDisplay(){
    this.display = !this.display;
  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }
  getEdition() {
    if (this.editingLabel === true) {
      return "Editer";
    }else {
      return "Visualiser";
    }
  }

  updateComment(newComment: string) {
    const oldComment = this.list.data['comment'];
    this.todoListService.SERVER_UPDATE_LIST_DATA(this.list.id,{comment:newComment});
    // Information
    this.snackBar.open("Commentaire enregistré",  'annuler', {
      duration: 50000,
    }).onAction().subscribe(() => {
      this.todoListService.SERVER_UPDATE_LIST_DATA(this.list.id,{comment:oldComment});
    });
  }
  getComment(): string {
    if (this.list.data['comment'] === null || !this.list.data['comment']) {return ""; }
    return this.list.data['comment'];
  }
}
