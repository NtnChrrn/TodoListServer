import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListID, ItemJSON, TodoListService}  from "../todo-list.service";



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
  @Input() color:    string;
  showComment : boolean = false;

  private editingLabel = false;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.comment = 'salut';
    console.log("init:dateBegin = "+this.item.data['dateBegin']);
  }

  ngOnChanges(changes: SimpleChanges) { }

  colorLigne(){
    let color = this.color;
    let today : Date = new Date();

    // if date limit is out
    if(this.getDateEnd()!=null && this.getDateEndDateFormat() < today){
      color="red";
    }
    // if date limit is near out (current date + 1 day)
    if(this.getDateEnd()!=null
      && this.getDateEndDateFormat() < new Date(today.getTime()+1* 86400000)
      && this.getDateEndDateFormat() > today){
      color="#e67e22";
    }
    console.log(color);
    let styles = {
      'background-color': color
    }
    return styles;
  }
  setLabel(label: string) {
    if (label === "") {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
    }
    this.editLabel(false);
  }

  setDateBegin(inputDate: any): void {
    let d = this.addZero(inputDate.getDate()) + "/" + this.addZero((inputDate.getMonth()+1)) + "/" + inputDate.getFullYear() + " " + this.addZero(inputDate.getHours()) + ":" + this.addZero(inputDate.getMinutes());
    this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id,{dateBegin:d});
  }

  getDateBegin(){
    return this.item.data['dateBegin'] ? this.item.data['dateBegin'].toString() : null;
  }

  /* Function to add zero if neccesery
  *  date any: 1
  *  return string: 01
  */
  addZero(date : any): string{
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
  getDateEnd(){
    return this.item.data['dateEnd'] ? this.item.data['dateEnd'].toString() : null;
  }

  /* get Date end of item in DATE format
  *  dateEnd: 15/11/2017 17:15
  *  return Date : 2017-11-15T17:15:00
  */
  getDateEndDateFormat():Date{
    if(this.item.data['dateEnd']==null)return null;

    return new Date(this.item.data['dateEnd'].substring(6,10)+
              '-' + this.item.data['dateEnd'].substring(3,5) +
              '-' + this.item.data['dateEnd'].substring(0,2) +
              'T' + this.item.data['dateEnd'].substring(11,13) +
              ':' + this.item.data['dateEnd'].substring(14,16) +':00');
  }

  /* get Date begin of item in DATE format
  *  dateBegin: 15/11/2017 17:15
  *  return Date : 2017-11-15T17:15:00
  */
  getDateBeginDateFormat():Date{
    if(this.item.data['dateBegin']==null)return null;

    return new Date(this.item.data['dateBegin'].substring(6,10)+
              '-' + this.item.data['dateBegin'].substring(3,5) +
              '-' + this.item.data['dateBegin'].substring(0,2) +
              'T' + this.item.data['dateBegin'].substring(11,13) +
              ':' + this.item.data['dateBegin'].substring(14,16) +':00');
  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
  }

  editDeleteButton() {
    let styles = {
      'display': this.edit ? 'none' : 'block'
    }
    return styles;
  }

  check(checked: any) {
    if(checked == null){
      checked = false;
    }
    else if(checked == false){
      checked = true;
    }
    else if(checked == true){
      checked = null;
    }
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  delete() {
    this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
  }

  toggleComment(){
    if(this.showComment == true){
      this.showComment = false;
    }else {
      this.showComment = true;
    }
  }

  updateComment() {
    this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, {comment: this.item.data['comment']});
  }
  getColor(): string {
    return this.color;
  }
}
