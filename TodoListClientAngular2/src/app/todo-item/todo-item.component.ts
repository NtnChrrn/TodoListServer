import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListID, ItemJSON, TodoListService}  from "../todo-list.service";
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
  @Input() color:    string;

  private checked : any;
  private showComment : boolean = false;
  private editingLabel = false;
  mouseOnButton = false;

  constructor(private todoListService: TodoListService,private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) { }

  colorLigne(){
    let color;
    let today : Date = new Date();

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

  colorBorder(){
    let styles = {
      'background-color': this.colorLigne()
    }
    return styles;
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
  getDateEndDateFormat(): Date{
    if(this.item.data['dateEnd']==null)return null;

    return new Date(this.item.data['dateEnd'].substring(6,10)+
              '-' + this.item.data['dateEnd'].substring(3,5) +
              '-' + this.item.data['dateEnd'].substring(0,2) +
              'T' + this.item.data['dateEnd'].substring(11,13) +
              ':' + this.item.data['dateEnd'].substring(14,16) +':00');
  }
  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
  }

  check(checked: any) {
    if(checked == null){
      this.checked = true;
    }
    else if(checked == false){
      this.checked = null;
    }
    else if(checked == true){
      this.checked = false;
    }
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

  isExistigComment(){
    if (this.item.data['comment']==null) return false;
    if (this.item.data['comment']=='') return false;
    return true;
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
