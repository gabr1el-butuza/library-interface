import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ApiService} from "../shared/api.service";
import {User} from "../books/model/user";
import {Book} from "../books/model/book";
import {FeedbackViewModel} from "../feedback/feedback.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  modalRef: BsModalRef;
  users: User[] = [];

  model: loginModel = {
    username: '',
    password: ''
  };

  constructor(private modalService: BsModalService, private apiService: ApiService) { }

  ngOnInit() {
    this.getAllUsers()
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
        localStorage.setItem('loggedUserId', res.userId);
        console.log(this.model)
        this.showMsgOk = true;
        console.log("Successful login!")
        //location.reload();
      },
      err => {
        this.showMsgErr = true;
        console.log("Username or password incorrect!")
        alert("An error has occurred while login");
      }
    );
  }


}

export interface loginModel {
  username: string;
  password: string;
}
