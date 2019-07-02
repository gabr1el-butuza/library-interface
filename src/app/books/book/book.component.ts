import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Book} from "../model/book";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "../../shared/api.service";
import {Category} from "../model/category";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  fileToUpload: File = null;
  modalRef: BsModalRef;
  pdfSrc: string = 'http://localhost:9005/library-service/files/';
  selectedBook: Book;
  fileSystemName: string;

  @Input() book: Book;
  @Output() bookUpdated: EventEmitter<Book> = new EventEmitter<Book>();
  @Output() bookDeleted: EventEmitter<Book> = new EventEmitter<Book>();
  @Input() isLoggedin;

  constructor(private modalService: BsModalService, private apiService: ApiService) {

  }


  ngOnInit() {
    console.log(this.isLoggedin);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateBook() {
    this.bookUpdated.emit(this.book);
  }

  deleteBook() {
    this.bookDeleted.emit(this.book);
  }

  //---------- Upload pdf files -----------
  onFileSelected(event){
    this.fileToUpload = <File>event.target.files[0];
    this.uploadFileToActivity(this.fileToUpload);
  }

  uploadFileToActivity(fileToUpload: File) {
    this.selectedBook = this.book;
    this.apiService.postFile(fileToUpload).subscribe(
      data => {
        this.book.bookPath = fileToUpload.name;
        this.updateBook();

      console.log("Upload SUCCESS!!!");
    }, error => {
      console.log("Error to upload a file :( ");
    });
  }

  getFileSystem() {
    this.apiService.getFileSystem(this.fileSystemName)
      .subscribe(response => {
        console.log("Download file success!!!");
      },
        err =>{
        console.log("error while download file!")
        });
  }

  }

