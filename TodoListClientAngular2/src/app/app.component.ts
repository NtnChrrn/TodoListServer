import {Component, Input, OnInit} from '@angular/core';
import {TodoListService} from "./todo-list.service";
import {Router} from "@angular/router";
import "rxjs/add/operator/filter";
import {PassportUser} from "../data/protocol";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() title = 'Listes de choses à faire ...';
  private aujourdhui = new Date();


  constructor(private tdlService: TodoListService,
              private router: Router) {
  }

  dateAujourdhui(){
      // les noms de jours / mois
      let jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
      let mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
      // on recupere la date
      let date = new Date();
      // on construit le message
      let message = jours[date.getDay()] + " ";   // nom du jour
      message += date.getDate() + " ";   // numero du jour
      message += mois[date.getMonth()] + " ";   // mois
      message += date.getHours() + "h" + this.addZero(date.getMinutes());
      return message;

  }
  /* Function to add zero if neccesery
 *  date any: 1
 *  return string: 01
 */
  addZero(date : any): string{
    if(date<10)return '0' + date;
    else return date;
  }

  getUser(): PassportUser {
    return this.tdlService.getUser();
  }

  getUserProvider(): string {
    return this.getUser().provider;
  }

  getUserName(): string {
    return this.getUser().name;
  }

  getUserMail(): string {
    const emails = this.getUser().emails;
    return emails ? emails[0] : "";
  }

  getUserPhoto(): string {
    const photos = this.getUser().photos;
    return photos ? photos[0] : "";
  }

  getConnected() {
    return this.tdlService.getConnected();
  }

  tryReconnectSocket() {
    this.tdlService.tryReconnectSocket();
  }

  ngOnInit() {
    this.router.navigate(["lists"]);
  }
}
