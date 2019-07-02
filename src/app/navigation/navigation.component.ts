import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ApiService} from "../shared/api.service";
import {User} from "../books/model/user";
import {Book} from "../books/model/book";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {BookComponent} from "../books/book/book.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  modalRef: BsModalRef;
  users: User[] = [];
  isLoggedin: boolean = false;
  userDisplayName = '';

  model: loginModel = {
    id: '',
    username: '',
    password: ''
  };
  @ViewChild(BookComponent) child;
  constructor(private modalService: BsModalService, private apiService: ApiService) { }

  ngOnInit() {
    if(this.userDisplayName === ''){
      this.userDisplayName = localStorage.getItem('loggedUsername');
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public getAllUsers(){
    this.apiService.getAllUsers().subscribe(
      res =>{
        this.users = res;
      },
      err =>{
        alert("Error occurred while get all books!");
      }
    );
  }

  showMsgOk: boolean = false;
  showMsgErr: boolean = false;

  login(): void {
    this.apiService.login(this.model.username, this.model.password).subscribe(
      res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('loggedUsername', this.model.username);
        this.showMsgOk = true;
        this.userDisplayName = localStorage.getItem('loggedUsername');;
        //location.reload();
        this.isLoggedin = true;
      },
      err => {
        this.showMsgErr = true;
        console.log("Username or password incorrect!")
      }
    );
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('loggedUsername');
    localStorage.clear();
    this.isLoggedin = false;
    this.showMsgOk = false;
    this.showMsgErr = false;
  }


  isLoggedIn() {
    if (localStorage.getItem('accessToken') == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      return true;
    }
  }

}

export interface loginModel {
  id: string;
  username: string;
  password: string;
}
