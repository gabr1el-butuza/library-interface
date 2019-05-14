import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {Notebook} from "../books/model/notebook";
import {Book} from "../books/model/book";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:9005/library-service";
  private ALL_NOTEBOOKS_URL = `${this.BASE_URL}/notebooks`;
  private SEND_FEEDBACK_URL = `${this.BASE_URL}/feedback`;
  private SAVE_NOTEBOOK_URL = `${this.BASE_URL}/notebook`;
  private UPDATE_NOTEBOOK_URL = `${this.BASE_URL}/notebook/`;
  private DELETE_NOTEBOOK_URL = `${this.BASE_URL}/notebook-delete/`;
  private ALL_BOOKS_URL = `${this.BASE_URL}/books`;
  private BOOKS_BY_NOTEBOOK_URL = `${this.BASE_URL}/books/byId/`;
  private SAVE_BOOK_URL = `${this.BASE_URL}/book`;

  constructor(private http: HttpClient) {

  }

  getAllNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);
  }

  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return this.http.post(this.SEND_FEEDBACK_URL, feedback);
  }

  postNotebook(notebook: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(this.SAVE_NOTEBOOK_URL, notebook);
  }

  updateNotebook(id:string, notebook:Notebook): Observable<any> {
    return this.http.put(this.UPDATE_NOTEBOOK_URL + id, notebook);
  }

  deleteNotebook(id: string): Observable<any> {
    return this.http.delete(this.DELETE_NOTEBOOK_URL + id);
  }

  getAllBooks(): Observable<Book[]>{
    return  this.http.get<Book[]>(this.ALL_BOOKS_URL);
  }

  getBooksByNotebook(notebookId: string): Observable<Book[]>{
    return this.http.get<Book[]>(this.BOOKS_BY_NOTEBOOK_URL + notebookId);
  }

  saveBook(book: Book):Observable<Book>{
    return this.http.post<Book>(this.SAVE_BOOK_URL, book);
  }

}
