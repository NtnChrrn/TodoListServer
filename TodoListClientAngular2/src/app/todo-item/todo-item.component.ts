import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";
import {ConfirmationService} from 'primeng/primeng';




@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService]
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item:    ItemJSON;
  @Input() listId:  ListID;
  @Input() clock:   number;
  @Input() index:   number;
  @Input() edit:    boolean;
  @Input() color:   string;

  private checked:  any;
  private showComment     = false;
  private editingLabel    = false;
  public  mouseOnButton   = false;

  constructor(private todoListService: TodoListService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) { }

  colorLigne(){
    let color;
    let today : Date = new Date();

    if(this.getDateEnd()!=null){
      color = "black";
    }

    // if date limit is out
    if(this.getDateEnd()!=null && this.getDateEndDateFormat() < today){
      color="red";
      if(!this.checked){
        this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, false);
      }
    }
    // if date limit is near out (current date + 1 day)
    if(this.getDateEnd()!=null
      && this.getDateEndDateFormat() < new Date(today.getTime()+1* 86400000)
      && this.getDateEndDateFormat() > today){
      color="#e67e22";
    }
    /*let styles = {
      'border-left': 'solid 5px' + color
    }*/
    return color;
  }

  colorDate(){
    let styles = {
      'color': this.colorLigne()
    }
    return styles;
  }


  /* Function to add zero if neccesery
  *  date any: 1
  *  return string: 01
  */
  addZero(date: any): string{
    if(date<10)return '0' + date;
    else return date;
  }

  /* setDate from input date calendar
   */
  setDateEnd(inputDate: any): void {
    let d = this.addZero(inputDate.getDate()) + "/" + this.addZero((inputDate.getMonth()+1)) + "/" + inputDate.getFullYear() + " " + this.addZero(inputDate.getHours()) + ":" + this.addZero(inputDate.getMinutes());
    this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id,{dateEnd:d});
  }

  /* get Date end of item in string format
  *  return string : 15/11/2017 17:15
  */
  getDateEnd() {
    return this.item.data['dateEnd'] ? this.item.data['dateEnd'].toString() : null;
  }

  /* get Date end of item in DATE format
  *  dateEnd: 15/11/2017 17:15
  *  return Date : 2017-11-15T17:15:00
  */
  getDateEndDateFormat(): Date {
    if (!this.item.data['dateEnd']) {return null; }

    return new Date(this.item.data['dateEnd'].substring(6, 10) +
              '-' + this.item.data['dateEnd'].substring(3, 5) +
              '-' + this.item.data['dateEnd'].substring(0, 2) +
              'T' + this.item.data['dateEnd'].substring(11, 13) +
              ':' + this.item.data['dateEnd'].substring(14, 16) + ':00');
  }

  dateToString(): string {
    const tab_jour = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    const tab_mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                                "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
    const date: Date = this.getDateEndDateFormat();

    if (!this.getDateEndDateFormat()) {return null; }
    return tab_jour[date.getDay()] + " " + date.getDate() + " " + tab_mois[date.getMonth()] + ", " + date.getHours() + "h" + date.getMinutes();
  }


  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
  }

  editLabel2() {
    this.editingLabel = !this.editingLabel;
  }
  check(checked: any) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, this.checked);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer cet item ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
      },

    });
  }

  toggleComment() {
    if (this.showComment === true) { this.showComment = false;
    }else { this.showComment = true; }
  }

  updateComment() {
    this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, {comment: this.item.data['comment']});
  }
  getColor(): string {
    return this.color;
  }

  haveDate(): boolean {
    if (this.getDateEnd() == null) { return false;
    }else { return true; }
  }

  haveComment(): boolean {
    if (this.item.data['comment'] == null || this.item.data['comment'] === '') {
      return false;
    } else {
      return true;
    }
  }

  getEdition() {
    if (this.editingLabel === true) {
      return "Editer";
    }else {
      return "Visualiser";
    }
  }
}
