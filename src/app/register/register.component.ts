import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ApiService} from "../shared/api.service";
import {Book} from "../books/model/book";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {
  model: RegisterViewModel = {
    username: '',
    password: '',
  };
  constructor(private apiService: ApiService) { }


  ngOnInit() {
  }

  showMsg: boolean = false;
  register() {
      this.apiService.createUser(this.model).subscribe(
        res => {
          //location.reload();
          this.showMsg = true;
        },
        err => {
          alert("An error has occurred while register");
        }
      );
  }

}

export interface RegisterViewModel {
  username: string;
  password: string;
}
