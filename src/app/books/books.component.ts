import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Category} from "./model/category";
import {Book} from "./model/book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  categories: Category[] = [];
  books: Book[] = [];
  selectedCategory: Category;
  searchText: string;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllCategories();
    this.getAllBooks();
  }

  public getAllCategories(){
    this.apiService.getAllCategories().subscribe(
      res=>{
        this.categories = res;
      },
      err=>{
        alert("Am error has occurred to books class!");
      }
    );
  }

  public getAllBooks(){
    this.apiService.getAllBooks().subscribe(
      res =>{
        this.books = res;
      },
      err =>{
        alert("Error occurred while get all books!");
      }
    );
  }
  createCategory() {
    let newNCategory: Category = {
      name: 'newCategory',
      id: null,
      nbOfBooks: 0
    }

    this.apiService.postCategory(newNCategory).subscribe(
      res=>{
        newNCategory.id = res.id;
        this.categories.push(newNCategory);
      },
      error1 => {
        alert("An error has occurred while saving the category!");
      }
    );
  }

  updateCategory(category: Category) {
    this.apiService.updateCategory(category.id, category).subscribe(
      res=>{
      },
      error1 => {
        alert("An error has occurred while update category!");
      }
    );
  }

  updateBook(book: Book) {
    this.apiService.updateBook(book.id, book).subscribe(
      res=>{
      },
      error1 => {
        alert("An error has occurred while update book!");
      }
    );
  }

  deleteCategory(category: Category) {
    if(confirm("Are you sure you want to delete this category?")){
      this.apiService.deleteCategory(category.id).subscribe(
        res=>{
          let indexOfNotebook = this.categories.indexOf(category);
          this.categories.splice(indexOfNotebook, 1);
        },
        error1 => {
          alert("Could not delete category!");
        }
      );
    }
  }

  deleteBook(book: Book) {
    if(confirm("Are you sure you want to delete this book?")){
      this.apiService.deleteBook(book.id).subscribe(
        res=>{
          let indesOfBook = this.books.indexOf(book);
          this.books.splice(indesOfBook, 1);
        },
        error1 => {
          alert("Could not delete book!");
        }
      );
    }
  }

  createBook(categoryId: string) {
    let newBook: Book = {
      id:null,
      title: "New Book",
      text: "Write some text in here",
      bookPath: null,
      lastModifiedOn: null,
      categoryId: categoryId
    };

    this.apiService.saveBook(newBook).subscribe(
      res =>{
        newBook.id = res.id;
        this.books.push(newBook);
      },
      err =>{
        alert("An error occurred while saving the book!");
      }
    );
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
    this.apiService.getBooksByCategory(category.id).subscribe(
      res =>{
        this.books = res;
      },
      err =>{
        alert("An error has occurred while get a book by category!");
      }
    );
  }

}
