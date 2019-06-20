import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Book} from "../model/book";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ApiService} from "../../shared/api.service";
import {
  LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
  ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService
} from '@syncfusion/ej2-angular-pdfviewer';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],

})
export class BookComponent implements OnInit {
  page:number = 1;
  pdfSrc:string = '';

  // set the service url to PdfViewer control
  public service = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
// default document to render in the PdfViewer control
  public document = 'PDF_Succinctly.pdf';

  modalRef: BsModalRef;
  @Input() book: Book;
  @Output() bookUpdated: EventEmitter<Book> = new EventEmitter<Book>();
  @Output() bookDeleted: EventEmitter<Book> = new EventEmitter<Book>();


  constructor(private modalService: BsModalService,  private apiService: ApiService) { }

  
  ngOnInit() {
    this.pdfSrc = this.apiService.getPDF(this.book.bookPath);
  }

  // onFileSelected() {
  //   let img: any = document.querySelector("#file");
  //
  //   if(typeof (FileReader) !== 'undefined') {
  //     let reader = new FileReader();
  //
  //     reader.onload = (e:any) => {
  //       this.pdfSrc = e.target.result;
  //     }
  //
  //     reader.readAsArrayBuffer(img.files[0]);
  //   }
  // }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateBook() {
    this.bookUpdated.emit(this.book);
  }

  deleteBook() {
    this.bookDeleted.emit(this.book);
  }

}
