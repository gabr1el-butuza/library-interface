import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {Book} from "../books/model/book";
import {Category} from "../books/model/category";
import {RegisterViewModel} from "../register/register.component";
import {User} from "../books/model/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:9005/library-service";
  private ALL_CATEGORIES_URL = `${this.BASE_URL}/categories`;
  private SEND_FEEDBACK_URL = `${this.BASE_URL}/feedback`;
  private SAVE_CATEGORY_URL = `${this.BASE_URL}/category`;
  private UPDATE_CATEGORY_URL = `${this.BASE_URL}/category/`;
  private DELETE_CATEGORY_URL = `${this.BASE_URL}/category-delete/`;
  private ALL_BOOKS_URL = `${this.BASE_URL}/books`;
  private BOOKS_BY_CATEGORY_URL = `${this.BASE_URL}/byCategory/`;
  private SAVE_BOOK_URL = `${this.BASE_URL}/book`;
  private UPDATE_BOOK_URL = `${this.BASE_URL}/book/`;
  private DELETE_BOOK_URL = `${this.BASE_URL}/book-delete/`;
  private LOGIN_URL = `${this.BASE_URL}/auth/login`;
  private REGISTER_URL = `${this.BASE_URL}/user`;
  private ALL_USERS_URL = `${this.BASE_URL}/users`;

  constructor(private http: HttpClient) {

  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.ALL_CATEGORIES_URL);
  }

  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return this.http.post(this.SEND_FEEDBACK_URL, feedback);
  }

  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.SAVE_CATEGORY_URL, category);
  }

  updateCategory(id: string, category: Category): Observable<any> {
    return this.http.put(this.UPDATE_CATEGORY_URL + id, category);
  }

  updateBook(id: string, book: Book): Observable<any> {
    return this.http.put(this.UPDATE_BOOK_URL + id, book);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(this.DELETE_CATEGORY_URL + id);
  }

  getAllBooks(): Observable<Book[]>{
    return  this.http.get<Book[]>(this.ALL_BOOKS_URL);
  }

  getBooksByCategory(categoryId: string): Observable<Book[]>{
    return this.http.get<Book[]>(this.BOOKS_BY_CATEGORY_URL + categoryId);
  }

  saveBook(book: Book):Observable<Book>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken') });
    let options = { headers: headers };
    return this.http.post<Book>(this.SAVE_BOOK_URL, book, options);
  }

  deleteBook(id: string):Observable<any>{
    return this.http.delete(this.DELETE_BOOK_URL + id);
  }

  createUser(user: RegisterViewModel): Observable<any> {
    return this.http.post(this.REGISTER_URL, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.LOGIN_URL, {"username": username, "password":password});
  }

  getAllUsers(): Observable<User[]>{
  return  this.http.get<User[]>(this.ALL_USERS_URL);
  }

  getPDF(bookPath):string {
    return '/assets/books/' + bookPath;
  }
}
